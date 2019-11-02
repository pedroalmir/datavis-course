/**
 * Based on javascript implementation https://github.com/awaisathar/lda.js
 * Original code based on http://www.arbylon.net/projects/LdaGibbsSampler.java
 * 
 * @param {*} sentences 
 * @param {*} numberOfTopics 
 * @param {*} numberOfTermsPerTopic 
 * @param {*} alphaValue 
 * @param {*} betaValue 
 * @param {*} randomSeed 
 */
function executeLDA(sentences, numberOfTopics, numberOfTermsPerTopic, alphaValue, betaValue, randomSeed) {
    console.time("LDA-Timer");
    var lda = new LDA();
    // The probabilities will consist of topics and their included terms 
    // [[{"term":"word1", "probability":0.065}, {"term":"word2", "probability":0.047}, ... ], 
    // [{"term":"word1", "probability":0.085}, {"term":"word2", "probability":0.024}, ... ]].
    var topicProbabilities = [];
    // Index-encoded array of sentences, with each row containing the indices of the words in the vocabulary.
    var documents = new Array();
    // Hash of vocabulary words and the count of how many times each word has been seen.
    var f = {};
    // Vocabulary of unique words (porter stemmed).
    var vocab = new Array();
    // Vocabulary of unique words in their original form.
    var vocabOrig = {};

    if (sentences && sentences.length > 0) {
        for(var i = 0; i < sentences.length; i++) {
			console.log('Sentence: ' + i)
            if (sentences[i] == "") continue;

            documents[i] = new Array();
            var words = sentences[i] ? sentences[i].split(/[\s,\"]+/) : null;

            if(!words) continue;

            for(var wc = 0; wc < words.length; wc++) {
                var w = words[wc]; //.toLowerCase().replace(/[^a-z\'A-Z0-9\u00C0-\u00ff ]+/g, '');
                // var wStemmed = stemmer(w); This code is not necessary because all the words have already been stemmed...
                var wStemmed = w;
                //if (w == "" || !wStemmed || w.length == 1 || stopwords.indexOf(w.replace("'", "")) > -1 || stopwords.indexOf(wStemmed) > -1 || w.indexOf("http") == 0) continue;
                if (f[wStemmed]) { 
                    f[wStemmed] = f[wStemmed] + 1;
                } else if(wStemmed) { 
                    f[wStemmed] = 1; 
                    vocab.push(wStemmed);
                    vocabOrig[wStemmed] = w;
                };
                
                documents[i].push(vocab.indexOf(wStemmed));
            }
        }

        var V = vocab.length;
        //var M = documents.length;
        var K = parseInt(numberOfTopics);
        var alpha = alphaValue || 0.1;                                // per-document distributions over topics
        var beta = betaValue   || .01;                                // per-topic distributions over words
        documents = documents.filter((doc) => { return doc.length }); // filter empty documents

		console.log('Configuring LDA...')
        lda.configure(documents, V, 10000, 2000, 100, 10, randomSeed);
		
		console.log('Gibbs...')
        lda.gibbs(K, alpha, beta);
		
		console.log('Get Theta...')
        var theta = lda.getTheta();
		
		console.log('Get Phi...')
        var phi = lda.getPhi();
		
		console.log('Topic modeling...')
		
        //topics
        var topTerms = numberOfTermsPerTopic;
        var topicText = new Array();
        for (var k = 0; k < phi.length; k++) {
            var things = new Array();
            for (var w = 0; w < phi[k].length; w++) {
                things.push("" + phi[k][w].toPrecision(2) + "_" + vocab[w] + "_" + vocabOrig[vocab[w]]);
            }
            things.sort().reverse();
            //console.log(things);
            if(topTerms > vocab.length) topTerms = vocab.length;
            topicText[k] = '';
            //console.log('Topic ' + (k + 1));
            var row = [];
            
            for (var t = 0; t < topTerms; t++) {
                var topicTerm = things[t].split("_")[2];
                var prob = parseInt(things[t].split("_")[0] * 100);
                if (prob < 2) continue;
                
                //console.log('Top Term: ' + topicTerm + ' (' + prob + '%)');
                topicText[k] += (topicTerm + " ");
                
                var term = {};
                term.term = topicTerm;
                term.probability = parseFloat(things[t].split("_")[0]);
                row.push(term);
            }

            topicProbabilities.push(row);
        }
		
		console.log('Processing results...')
		
        //console.log(topicText);
        var sentencesData = [];
        for (var m = 0; m < theta.length; m++) {
            var probPerTopic = {};
		    for (var k = 0; k < theta[m].length; k++) {
                probPerTopic["topic" + k] = {"text": topicText[k].trim(), "probability": theta[m][k] * 100};
            }
            sentencesData.push({"sentence": sentences[m], probPerTopic})
            //console.log(probPerTopic);
	    }
    }
    console.timeEnd("LDA-Timer");
    return {"topicProbabilities": topicProbabilities, "sentencesData": sentencesData};
}

function makeArray(x) {
    return new Array(x).fill(0);
}

function make2DArray(x, y) {
    return new Array(x).fill(new Array(y).fill(0));;
}

class LDA {
    constructor() {
        this.documents, this.z, this.nw, this.nd, this.nwsum, this.ndsum; 
        this.thetasum, this.phisum, this.V, this.K, this.alpha, this.beta;

        this.THIN_INTERVAL = 20;
        this.BURN_IN = 100;
        this.ITERATIONS = 1000;
        this.SAMPLE_LAG;
        this.RANDOM_SEED;
        this.dispcol = 0;
        this.numstats = 0;
    }

    initialState(K) {
        var i;
        var M = this.documents.length;
        this.nw = make2DArray(this.V, K);
        this.nd = make2DArray(M, K);
        this.nwsum = makeArray(K);
        this.ndsum = makeArray(M);
        this.z = new Array();

        for (i = 0; i < M; i++)
            this.z[i] = new Array();

        for (var m = 0; m < M; m++) {
            var N = this.documents[m].length;
            this.z[m] = new Array();
            for (var n = 0; n < N; n++) {
                var topic = parseInt("" + (this.getRandom() * K));
                this.z[m][n] = topic;
                this.nw[this.documents[m][n]][topic]++;
                this.nd[m][topic]++;
                this.nwsum[topic]++;
            }
            this.ndsum[m] = N;
        }
    };

    sampleFullConditional(m, n) {
        var topic = this.z[m][n];
        this.nw[this.documents[m][n]][topic]--;
        this.nd[m][topic]--;
        this.nwsum[topic]--;
        this.ndsum[m]--;
        var p = makeArray(this.K);
        for (var k = 0; k < this.K; k++) {
            p[k] = (this.nw[this.documents[m][n]][k] + this.beta) / (this.nwsum[k] + this.V * this.beta) * (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
        }
        for (var k = 1; k < p.length; k++) {
            p[k] += p[k - 1];
        }
        var u = this.getRandom() * p[this.K - 1];
        for (topic = 0; topic < p.length; topic++) {
            if (u < p[topic]) break;
        }
        this.nw[this.documents[m][n]][topic]++;
        this.nd[m][topic]++;
        this.nwsum[topic]++;
        this.ndsum[m]++;
        return topic;
    };

    updateParams() {
        for (var m = 0; m < this.documents.length; m++) {
            for (var k = 0; k < this.K; k++) {
                this.thetasum[m][k] += (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
            }
        }
        for (var k = 0; k < this.K; k++) {
            for (var w = 0; w < this.V; w++) {
                this.phisum[k][w] += (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
            }
        }
        this.numstats++;
    };

    getRandom() {
        if (this.RANDOM_SEED) {
            // generate a pseudo-random number using a seed to ensure reproducable results.
            var x = Math.sin(this.RANDOM_SEED++) * 1000000;
            return x - Math.floor(x);
        } else {
            // use standard random algorithm.
            return Math.random();
        }
    };

    configure(docs, v, iterations, burnIn, thinInterval, sampleLag, randomSeed) {
        this.ITERATIONS = iterations;
        this.BURN_IN = burnIn;
        this.THIN_INTERVAL = thinInterval;
        this.SAMPLE_LAG = sampleLag;
        this.RANDOM_SEED = randomSeed;
        this.documents = docs;
        this.V = v;
        this.dispcol = 0;
        this.numstats = 0;
    };

    gibbs(K, alpha, beta) {
        var i;
        this.K = K;
        this.alpha = alpha;
        this.beta = beta;
        if (this.SAMPLE_LAG > 0) {
            this.thetasum = make2DArray(this.documents.length, this.K);
            this.phisum = make2DArray(this.K, this.V);
            this.numstats = 0;
        }
        this.initialState(K);
        //document.write("Sampling " + this.ITERATIONS
        //   + " iterations with burn-in of " + this.BURN_IN + " (B/S="
        //   + this.THIN_INTERVAL + ").<br/>");
        for (i = 0; i < this.ITERATIONS; i++) {
            console.log('LDA Iteration ' + i);
            for (var m = 0; m < this.z.length; m++) {
                for (var n = 0; n < this.z[m].length; n++) {
                    var topic = this.sampleFullConditional(m, n);
                    this.z[m][n] = topic;
                }
            }
            if ((i < this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("B");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("S");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (this.SAMPLE_LAG > 0) && (i % this.SAMPLE_LAG == 0)) {
                this.updateParams();
                //document.write("|");                
                if (i % this.THIN_INTERVAL != 0)
                    this.dispcol++;
            }
            if (this.dispcol >= 100) {
                //document.write("*<br/>");                
                this.dispcol = 0;
            }
        }
    };

    getTheta() {
        var theta = new Array();
        for (var i = 0; i < this.documents.length; i++)
            theta[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = this.thetasum[m][k] / this.numstats;
                }
            }
        } else {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
                }
            }
        }
        return theta;
    };

    getPhi() {
        var phi = new Array();
        for (var i = 0; i < this.K; i++)
            phi[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = this.phisum[k][w] / this.numstats;
                }
            }
        } else {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
                }
            }
        }
        return phi;
    };
};
