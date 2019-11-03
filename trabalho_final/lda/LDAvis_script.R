## Not run:
library(mallet)
library(LDAvis)

## Create a wrapper for the data with three elements, one for each column.
## R does some type inference, and will guess wrong, so give it hints with "colClasses".
## Note that "id" and "text" are special fields -- mallet will look there for input.
## "class" is arbitrary. We will only use that field on the R side.
documents <- read.table("D:/Git/datavis-course/trabalho_final/data/PostsTreated.csv", col.names=c("id", "text"), sep=",", quote="", stringsAsFactors = FALSE)

## Create a mallet instance list object. Right now I have to specify the stoplist
## as a file, I can't pass in a list from R.
## This function has a few hidden options (whether to lowercase, how we
## define a token). See ?mallet.import for details.
mallet.instances <- mallet.import(documents$id, documents$text, "D:/Desenvolvimento/mallet/mallet-2.0.8/stoplists/en.txt", token.regexp = "\\p{L}[\\p{L}\\p{P}]+\\p{L}")

## Create a topic trainer object.
topic.model <- MalletLDA(num.topics=20)

## Load our documents. We could also pass in the filename of a
## saved instance list file that we build from the command-line tools.
topic.model$loadDocuments(mallet.instances)

## Get the vocabulary, and some statistics about word frequencies.
## These may be useful in further curating the stopword list.
vocabulary <- topic.model$getVocabulary()
word.freqs <- mallet.word.freqs(topic.model)

## Optimize hyperparameters every 20 iterations,
## after 50 burn-in iterations.
topic.model$setAlphaOptimization(20, 50)

## Now train a model. Note that hyperparameter optimization is on, by default.
## We can specify the number of iterations. Here we'll use a large-ish round number.
topic.model$train(200)

## NEW: run through a few iterations where we pick the best topic for each token,
## rather than sampling from the posterior distribution.
topic.model$maximize(10)

## Get the probability of topics in documents and the probability of words in topics.
## By default, these functions return raw word counts. Here we want probabilities,
## so we normalize, and add "smoothing" so that nothing has exactly 0 probability.
doc.topics <- mallet.doc.topics(topic.model, smoothed=T, normalized=T)
topic.words <- mallet.topic.words(topic.model, smoothed=T, normalized=T)

phi <- mallet::mallet.topic.words(topic.model, smoothed = TRUE, normalized = TRUE)
theta <- mallet::mallet.doc.topics(topic.model, smoothed = TRUE, normalized = TRUE)	
doc.length <- rowSums(mallet::mallet.doc.topics(topic.model, smoothed = FALSE, normalized = FALSE))
word.freqs <- mallet::mallet.word.freqs(topic.model)
vocab <- topic.model$getVocabulary()
json <- list(phi = phi, theta = theta, doc.length = doc.length, vocab = vocab, term.frequency = droplevels(word.freqs)$term.freq)
jsonLDA <- LDAvis::createJSON(phi = json$phi, theta = json$theta, doc.length = json$doc.length, vocab = json$vocab, term.frequency = json$term.frequency)
  
# if you want to put it on Github, need to havae gistr installed
# this can be done by:
# devtools::install_github('rOpenSci/gistr')
# library(gistr)
# see help("serVis") for more details
library(gistr)
LDAvis::serVis(jsonLDA, out.dir = "D:/Git/datavis-course/trabalho_final/lda/lda_data/output/d3js", open.browser = TRUE, as.gist = TRUE)

## End(Not run)do