## Imports:
## install.packages("jsonlite")
library(mallet)
library(LDAvis)
library(jsonlite)
library(gistr)

nTopics <- 3

## Paths
dataFilePath <- "D:/GoogleDrive/PedroAlmir/09_Doutorado/UFC/projetos/7_eHealthVis/dataset/20191210_eHealthvisDataset_LDA.csv"
rootPath <- "D:/GoogleDrive/PedroAlmir/09_Doutorado/UFC/projetos/7_eHealthVis/topicModeling/"
outputBasePath <- "D:/GoogleDrive/PedroAlmir/09_Doutorado/UFC/projetos/7_eHealthVis/topicModeling/lda_"
stopWordsPath <- "D:/GoogleDrive/PedroAlmir/09_Doutorado/UFC/projetos/7_eHealthVis/topicModeling/stop_words.txt"

outputDirPath <- paste(outputBasePath, nTopics, sep = "")

## Create a wrapper for the data with three elements, one for each column.
## Note that "id" and "text" are special fields -- mallet will look there for input.
documents <- read.table(dataFilePath, col.names = c("id", "text"), sep = ",", quote = "", stringsAsFactors = FALSE)

## Create a mallet instance list object. Right now I have to specify the stoplist
## Original regex: \\p{L}[\\p{L}\\p{P}]+\\p{L}
## Other options: \\p{L}[\\p{L}\\p{P}]* or [\\p{L}\\p{P}]+
mallet.instances <- mallet.import(documents$id, documents$text, stopWordsPath, token.regexp = "\\p{L}[\\p{L}\\p{P}]+\\p{L}")

## Create a topic trainer object.
topic.model <- MalletLDA(num.topics = nTopics)

## Load our documents.    
topic.model$loadDocuments(mallet.instances)

## Get the vocabulary, and some statistics about word frequencies.
## These may be useful in further curating the stopword list.
vocabulary <- topic.model$getVocabulary()
word.freqs <- mallet.word.freqs(topic.model)

## Optimize hyperparameters every 10 iterations, after 20 burn-in iterations.
topic.model$setAlphaOptimization(10, 20)

## Now train a model. Note that hyperparameter optimization is on, by default.
topic.model$train(500)

## Run through a few iterations where we pick the best topic for each token
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
LDAvis::serVis(jsonLDA, out.dir = outputDirPath, open.browser = TRUE, as.gist = FALSE)

topic.labels <- mallet.topic.labels(topic.model, topic.words, 3)

file.copy(paste(outputDirPath, "/lda.json", sep = ""), rootPath)
file.rename(paste(rootPath, "lda.json", sep = ""), paste(rootPath, "lda_", nTopics,".json", sep = ""))

## End(Not run)