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
function process(sentences, numberOfTopics, numberOfTermsPerTopic, alphaValue, betaValue, randomSeed) {
    var lda = new LDA();
    // The result will consist of topics and their included terms 
    // [[{"term":"word1", "probability":0.065}, {"term":"word2", "probability":0.047}, ... ], 
    // [{"term":"word1", "probability":0.085}, {"term":"word2", "probability":0.024}, ... ]].
    var result = [];
    // Index-encoded array of sentences, with each row containing the indices of the words in the vocabulary.
    var documents = new Array();
    // Hash of vocabulary words and the count of how many times each word has been seen.
    var f = {};
    // Vocabulary of unique words (porter stemmed).
    var vocab = new Array();
    // Vocabulary of unique words in their original form.
    var vocabOrig = {};
    // Array of stop words
    var stopwords = getStopWords();

    if (sentences && sentences.length > 0) {
      
      for(var i = 0; i < sentences.length; i++) {
          if (sentences[i] == "") continue;

          documents[i] = new Array();
          var words = sentences[i] ? sentences[i].split(/[\s,\"]+/) : null;

          if(!words) continue;

          for(var wc = 0; wc < words.length; wc++) {
              var w = words[wc].toLowerCase().replace(/[^a-z\'A-Z0-9\u00C0-\u00ff ]+/g, '');
              var wStemmed = stemmer(w);
              if (w == "" || !wStemmed || w.length == 1 || stopwords.indexOf(w.replace("'", "")) > -1 || stopwords.indexOf(wStemmed) > -1 || w.indexOf("http") == 0) continue;
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
      var M = documents.length;
      var K = parseInt(numberOfTopics);
      var alpha = alphaValue || 0.1;                                // per-document distributions over topics
      var beta = betaValue   || .01;                                // per-topic distributions over words
      documents = documents.filter((doc) => { return doc.length }); // filter empty documents

      lda.configure(documents, V, 10000, 2000, 100, 10, randomSeed);
      lda.gibbs(K, alpha, beta);

      var theta = lda.getTheta();
      var phi = lda.getPhi();

      var text = '';

      //topics
      var topTerms = numberOfTermsPerTopic;
      for (var k = 0; k < phi.length; k++) {
          var things = new Array();
          for (var w = 0; w < phi[k].length; w++) {
               things.push("" + phi[k][w].toPrecision(2) + "_" + vocab[w] + "_" + vocabOrig[vocab[w]]);
          }
          things.sort().reverse();
          //console.log(things);
          if(topTerms>vocab.length) topTerms=vocab.length;

          //console.log('Topic ' + (k + 1));
          var row = [];
          
          for (var t = 0; t < topTerms; t++) {
              var topicTerm = things[t].split("_")[2];
              var prob = parseInt(things[t].split("_")[0] * 100);
              if (prob < 2) continue;
              
              //console.log('Top Term: ' + topicTerm + ' (' + prob + '%)');
              
              var term = {};
              term.term = topicTerm;
              term.probability = parseFloat(things[t].split("_")[0]);
              row.push(term);
          }

          result.push(row);
      }
    }
    
    return result;
}

function makeArray(x) {
    var a = new Array();    
    for (var i = 0; i < x; i++)  {
        a[i] = 0;
    }
    return a;
}

function make2DArray(x, y) {
    var a = new Array();    
    for (var i = 0; i < x; i++)  {
        a[i] = new Array();
        for (var j = 0; j < y; j++)
            a[i][j] = 0;
    }
    return a;
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
            p[k] = (this.nw[this.documents[m][n]][k] + this.beta) / (this.nwsum[k] + this.V * this.beta)
                * (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
        }
        for (var k = 1; k < p.length; k++) {
            p[k] += p[k - 1];
        }
        var u = this.getRandom() * p[this.K - 1];
        for (topic = 0; topic < p.length; topic++) {
            if (u < p[topic])
                break;
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

function getStopWords(){
    return [
        'a',
        'able',
        'about',
        'above',
        'abroad',
        'according',
        'accordingly',
        'across',
        'actually',
        'adj',
        'after',
        'afterwards',
        'again',
        'against',
        'ago',
        'ahead',
        'aint',
        'all',
        'allow',
        'allows',
        'almost',
        'alone',
        'along',
        'alongside',
        'already',
        'also',
        'although',
        'always',
        'am',
        'amid',
        'amidst',
        'among',
        'amongst',
        'an',
        'and',
        'another',
        'any',
        'anybody',
        'anyhow',
        'anyone',
        'anything',
        'anyway',
        'anyways',
        'anywhere',
        'apart',
        'appear',
        'appreciate',
        'appropriate',
        'are',
        'arent',
        'around',
        'as',
        'as',
        'aside',
        'ask',
        'asking',
        'associated',
        'at',
        'available',
        'away',
        'awfully',
        'b',
        'back',
        'backward',
        'backwards',
        'be',
        'became',
        'because',
        'become',
        'becomes',
        'becoming',
        'been',
        'before',
        'beforehand',
        'begin',
        'behind',
        'being',
        'believe',
        'below',
        'beside',
        'besides',
        'best',
        'better',
        'between',
        'beyond',
        'both',
        'brief',
        'but',
        'by',
        'c',
        'came',
        'can',
        'cannot',
        'cant',
        'cant',
        'caption',
        'cause',
        'causes',
        'certain',
        'certainly',
        'changes',
        'clearly',
        'cmon',
        'co',
        'co.',
        'com',
        'come',
        'comes',
        'concerning',
        'consequently',
        'consider',
        'considering',
        'constructor',
        'contain',
        'containing',
        'contains',
        'corresponding',
        'could',
        'couldnt',
        'course',
        'cs',
        'currently',
        'd',
        'dare',
        'darent',
        'definitely',
        'described',
        'despite',
        'did',
        'didnt',
        'different',
        'directly',
        'do',
        'does',
        'doesnt',
        'doing',
        'done',
        'dont',
        'down',
        'downwards',
        'during',
        'e',
        'each',
        'edu',
        'eg',
        'eight',
        'eighty',
        'either',
        'else',
        'elsewhere',
        'end',
        'ending',
        'enough',
        'entirely',
        'especially',
        'et',
        'etc',
        'even',
        'ever',
        'evermore',
        'every',
        'everybody',
        'everyone',
        'everything',
        'everywhere',
        'ex',
        'exactly',
        'example',
        'except',
        'f',
        'fairly',
        'far',
        'farther',
        'few',
        'fewer',
        'fifth',
        'first',
        'five',
        'followed',
        'following',
        'follows',
        'for',
        'forever',
        'former',
        'formerly',
        'forth',
        'forward',
        'found',
        'four',
        'from',
        'further',
        'furthermore',
        'g',
        'get',
        'gets',
        'getting',
        'given',
        'gives',
        'go',
        'goes',
        'going',
        'gone',
        'got',
        'gotten',
        'greetings',
        'h',
        'had',
        'hadnt',
        'half',
        'happens',
        'hardly',
        'has',
        'hasnt',
        'have',
        'havent',
        'having',
        'he',
        'hed',
        'hell',
        'hello',
        'help',
        'hence',
        'her',
        'here',
        'hereafter',
        'hereby',
        'herein',
        'heres',
        'hereupon',
        'hers',
        'herself',
        'hes',
        'hi',
        'him',
        'himself',
        'his',
        'hither',
        'hopefully',
        'how',
        'howbeit',
        'however',
        'hundred',
        'i',
        'id',
        'ie',
        'if',
        'ignored',
        'ill',
        'im',
        'immediate',
        'in',
        'inasmuch',
        'inc',
        'inc.',
        'indeed',
        'indicate',
        'indicated',
        'indicates',
        'inner',
        'inside',
        'insofar',
        'instead',
        'into',
        'inward',
        'is',
        'isnt',
        'it',
        'itd',
        'itll',
        'its',
        'its',
        'itself',
        'ive',
        'j',
        'just',
        'k',
        'keep',
        'keeps',
        'kept',
        'know',
        'known',
        'knows',
        'l',
        'last',
        'lately',
        'later',
        'latter',
        'latterly',
        'least',
        'less',
        'lest',
        'let',
        'lets',
        'like',
        'liked',
        'likely',
        'likewise',
        'little',
        'look',
        'looking',
        'looks',
        'low',
        'lower',
        'ltd',
        'm',
        'made',
        'mainly',
        'make',
        'makes',
        'many',
        'may',
        'maybe',
        'maynt',
        'me',
        'mean',
        'meantime',
        'meanwhile',
        'merely',
        'might',
        'mightnt',
        'mine',
        'minus',
        'miss',
        'more',
        'moreover',
        'most',
        'mostly',
        'mr',
        'mrs',
        'much',
        'must',
        'mustnt',
        'my',
        'myself',
        'n',
        'name',
        'namely',
        'nd',
        'near',
        'nearly',
        'necessary',
        'need',
        'neednt',
        'needs',
        'neither',
        'never',
        'neverf',
        'neverless',
        'nevertheless',
        'new',
        'next',
        'nine',
        'ninety',
        'no',
        'nobody',
        'non',
        'none',
        'nonetheless',
        'noone',
        'no-one',
        'nor',
        'normally',
        'not',
        'nothing',
        'notwithstanding',
        'novel',
        'now',
        'nowhere',
        'o',
        'obviously',
        'of',
        'off',
        'often',
        'oh',
        'ok',
        'okay',
        'old',
        'on',
        'once',
        'one',
        'ones',
        'ones',
        'only',
        'onto',
        'opposite',
        'or',
        'other',
        'others',
        'otherwise',
        'ought',
        'oughtnt',
        'our',
        'ours',
        'ourselves',
        'out',
        'outside',
        'over',
        'overall',
        'own',
        'p',
        'particular',
        'particularly',
        'past',
        'per',
        'perhaps',
        'placed',
        'please',
        'plus',
        'possible',
        'presumably',
        'probably',
        'provided',
        'provides',
        'q',
        'que',
        'quite',
        'qv',
        'r',
        'rather',
        'rd',
        're',
        'really',
        'reasonably',
        'recent',
        'recently',
        'regarding',
        'regardless',
        'regards',
        'relatively',
        'respectively',
        'right',
        'round',
        's',
        'said',
        'same',
        'saw',
        'say',
        'saying',
        'says',
        'second',
        'secondly',
        'see',
        'seeing',
        'seem',
        'seemed',
        'seeming',
        'seems',
        'seen',
        'self',
        'selves',
        'sensible',
        'sent',
        'serious',
        'seriously',
        'seven',
        'several',
        'shall',
        'shant',
        'she',
        'shed',
        'shell',
        'shes',
        'should',
        'shouldnt',
        'since',
        'six',
        'so',
        'some',
        'somebody',
        'someday',
        'somehow',
        'someone',
        'something',
        'sometime',
        'sometimes',
        'somewhat',
        'somewhere',
        'soon',
        'sorry',
        'specified',
        'specify',
        'specifying',
        'still',
        'sub',
        'such',
        'sup',
        'sure',
        't',
        'take',
        'taken',
        'taking',
        'tell',
        'tends',
        'th',
        'than',
        'thank',
        'thanks',
        'thanx',
        'that',
        'thatll',
        'thats',
        'thats',
        'thatve',
        'the',
        'their',
        'theirs',
        'them',
        'themselves',
        'then',
        'thence',
        'there',
        'thereafter',
        'thereby',
        'thered',
        'therefore',
        'therein',
        'therell',
        'therere',
        'theres',
        'theres',
        'thereupon',
        'thereve',
        'these',
        'they',
        'theyd',
        'theyll',
        'theyre',
        'theyve',
        'thing',
        'things',
        'think',
        'third',
        'thirty',
        'this',
        'thorough',
        'thoroughly',
        'those',
        'though',
        'three',
        'through',
        'throughout',
        'thru',
        'thus',
        'till',
        'to',
        'together',
        'too',
        'took',
        'toward',
        'towards',
        'tried',
        'tries',
        'truly',
        'try',
        'trying',
        'ts',
        'twice',
        'two',
        'u',
        'un',
        'under',
        'underneath',
        'undoing',
        'unfortunately',
        'unless',
        'unlike',
        'unlikely',
        'until',
        'unto',
        'up',
        'upon',
        'upwards',
        'us',
        'use',
        'used',
        'useful',
        'uses',
        'using',
        'usually',
        'v',
        'value',
        'various',
        'versus',
        'very',
        'via',
        'viz',
        'vs',
        'w',
        'want',
        'wants',
        'was',
        'wasnt',
        'way',
        'we',
        'wed',
        'welcome',
        'well',
        'well',
        'went',
        'were',
        'were',
        'werent',
        'weve',
        'what',
        'whatever',
        'whatll',
        'whats',
        'whatve',
        'when',
        'whence',
        'whenever',
        'where',
        'whereafter',
        'whereas',
        'whereby',
        'wherein',
        'wheres',
        'whereupon',
        'wherever',
        'whether',
        'which',
        'whichever',
        'while',
        'whilst',
        'whither',
        'who',
        'whod',
        'whoever',
        'whole',
        'wholl',
        'whom',
        'whomever',
        'whos',
        'whose',
        'why',
        'will',
        'willing',
        'wish',
        'with',
        'within',
        'without',
        'wonder',
        'wont',
        'would',
        'wouldnt',
        'x',
        'y',
        'yes',
        'yet',
        'you',
        'youd',
        'youll',
        'your',
        'youre',
        'yours',
        'yourself',
        'yourselves',
        'youve',
        'z',
        'zero'
    ];
};
