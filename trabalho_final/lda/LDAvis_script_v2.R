## Imports:
## install.packages("jsonlite")
library(mallet)
library(LDAvis)
library(jsonlite)

createLeafNode <- function(hclust, labels, i) {
    list(name = labels[i], order = hclust$order[[i]])
}

hclustToTree <- function(hclust, labels) {
    if (length(hclust$merge) == 0) 
        return(NULL)

    merges <- list()
    for (index in 1:nrow(hclust$merge)) {
        left <- hclust$merge[index, 1]
        right <- hclust$merge[index, 2]

        if (left < 0) 
            left <- createLeafNode(hclust, labels, -left) else left <- merges[[left]]
        if (right < 0) 
            right <- createLeafNode(hclust, labels, -right) else right <- merges[[right]]

        if (left$order > right$order) {
            tmp <- left
            left <- right
            right <- tmp
        }

        merges[[index]] <- list(children = list(left, right), order = left$order)
    }

    return(merges[nrow(hclust$merge)])
}

nTopics <- 150
dataFilePath <- "D:/Git/datavis-course/trabalho_final/data/PostsTreated.csv"
stopWordsPath <- "D:/Desenvolvimento/mallet/mallet-2.0.8/stoplists/en.txt"
#jsdir.create(outputDirPath)
#nTopicsList <- c(3,5,10,20,30,40,50,100,150,200)

#for (i in 1:length(nTopicsList)) {
 #print(paste("Iteration", i, ": topics-", nTopicsList[i], sep = "")
 #nTopics <- nTopicsList[i]

 outputDirPath <- paste("D:/Git/datavis-course/trabalho_final/data/mallet/lda_", nTopics, sep = "")
 jsonTreeFilePath <- paste(outputDirPath, "/tree_", nTopics, ".json", sep = "")

 ## Create a wrapper for the data with three elements, one for each column.
 ## R does some type inference, and will guess wrong, so give it hints with "colClasses".
 ## Note that "id" and "text" are special fields -- mallet will look there for input.
 ## "class" is arbitrary. We will only use that field on the R side.
 documents <- read.table(dataFilePath, col.names = c("id", "text"), sep = ",", quote = "", stringsAsFactors = FALSE)

 ## Create a mallet instance list object. Right now I have to specify the stoplist
 ## as a file, I can't pass in a list from R.
 ## This function has a few hidden options (whether to lowercase, how we
 ## define a token). See ?mallet.import for details.
 mallet.instances <- mallet.import(documents$id, documents$text, stopWordsPath, token.regexp = "\\p{L}[\\p{L}\\p{P}]+\\p{L}")

 ## Create a topic trainer object.
 topic.model <- MalletLDA(num.topics = nTopics)

 ## Load our documents. We could also pass in the filename of a
 ## saved instance list file that we build from the command-line tools.
 topic.model$loadDocuments(mallet.instances)

 ## Get the vocabulary, and some statistics about word frequencies.
 ## These may be useful in further curating the stopword list.
 vocabulary <- topic.model$getVocabulary()
 word.freqs <- mallet.word.freqs(topic.model)

 ## Optimize hyperparameters every 10 iterations,
 ## after 20 burn-in iterations.
 topic.model$setAlphaOptimization(10, 20)

 ## Now train a model. Note that hyperparameter optimization is on, by default.
 ## We can specify the number of iterations. Here we'll use a large-ish round number.
 topic.model$train(500)

 ## NEW: run through a few iterations where we pick the best topic for each token,
 ## rather than sampling from the posterior distribution.
 topic.model$maximize(10)

 ## Get the probability of topics in documents and the probability of words in topics.
 ## By default, these functions return raw word counts. Here we want probabilities,
 ## so we normalize, and add "smoothing" so that nothing has exactly 0 probability.
 doc.topics <- mallet.doc.topics(topic.model, smoothed=T, normalized=T)
 topic.words <- mallet.topic.words(topic.model, smoothed=T, normalized=T)


 ## Creating JSON LDA to use in LDAVis
 phi <- mallet::mallet.topic.words(topic.model, smoothed = TRUE, normalized = TRUE)
 theta <- mallet::mallet.doc.topics(topic.model, smoothed = TRUE, normalized = TRUE)	
 doc.length <- rowSums(mallet::mallet.doc.topics(topic.model, smoothed = FALSE, normalized = FALSE))
 word.freqs <- mallet::mallet.word.freqs(topic.model)
 vocab <- topic.model$getVocabulary()
 json <- list(phi = phi, theta = theta, doc.length = doc.length, vocab = vocab, term.frequency = droplevels(word.freqs)$term.freq)
 jsonLDA <- LDAvis::createJSON(phi = json$phi, theta = json$theta, doc.length = json$doc.length, vocab = json$vocab, term.frequency = json$term.frequency)

 # see help("serVis") for more details
 library(gistr)
 LDAvis::serVis(jsonLDA, out.dir = outputDirPath, open.browser = FALSE, as.gist = FALSE)

 topic.labels <- mallet.topic.labels(topic.model, topic.words, 3)
 clusters = mallet.topic.hclust(doc.topics, topic.words, 0.3)
 #plot(clusters, labels = topic.labels)

 halfway <- hclustToTree(clusters, topic.labels)
 jsonTree <- toJSON(halfway)
 write(jsonTree, jsonTreeFilePath)
#}
## End(Not run)