### Particpatory Assessment Analysis


## Install required packages 
## Uncomment for the installation
# install.packages("stringr")
# install.packages("plyr")
# install.packages("tm")
# install.packages("tm.plugin.mail")
# install.packages("SnowballC")
# install.packages("topicmodels")
# install.packages("LDAvis")
# install.packages("lda")
# install.packages("wordcloud")

library(stringr)
library(plyr)
library(tm)
library(tm.plugin.mail)
library(SnowballC)
library(topicmodels)
library(LDAvis)
library(ggplot2)
library(lda)
library(wordcloud)



## Loading our dataset
data <- read.csv("data/PAMatrix8April.csv")



#########################################################
############  Data Pre-processing

df <- do.call("rbind", lapply(data, as.data.frame))

partassess <- df

###  Before fitting a topic model, we need to tokenize the text. This dataset is already fairly clean, so we only remove punctuation and some common stop words. In particular, we use the english stop words from the SMART information retrieval system, available in the R package tm.

# pre-processing:
partassess <- gsub("'", "", partassess)  # remove apostrophes
partassess <- gsub("[[:punct:]]", " ", partassess)  # replace punctuation with space
partassess <- gsub("[[:cntrl:]]", " ", partassess)  # replace control characters with space
partassess <- gsub("^[[:space:]]+", "", partassess) # remove whitespace at beginning of documents
partassess <- gsub("[[:space:]]+$", "", partassess) # remove whitespace at end of documents
partassess <- tolower(partassess)  # force to lowercase

## Check
partassess.df <- as.data.frame(partassess)

# tokenize on space and output as a list:
doc.list <- strsplit(partassess, "[[:space:]]+")

# compute the table of terms:
term.table <- table(unlist(doc.list))
term.table <- sort(term.table, decreasing = TRUE)

# read in some stopwords & remove terms that are stop words or occur fewer than 5 times:
stop_words <- stopwords("SMART")
del <- names(term.table) %in% stop_words | term.table < 5
term.table <- term.table[!del]
vocab <- names(term.table)

# now put the documents into the format required by the lda package:
get.terms <- function(x) {
  index <- match(x, vocab)
  index <- index[!is.na(index)]
  rbind(as.integer(index - 1), as.integer(rep(1, length(index))))
}
documents <- lapply(doc.list, get.terms)


### Using the R package 'lda' for model fitting
## The object documents is a length-2000 list where each element represents one document, 
# according to the specifications of the lda package. 
# After creating this list, we compute a few statistics about the corpus:
  
# Compute some statistics related to the data set:
D <- length(documents)  # number of documents 
W <- length(vocab)  # number of terms in the vocab 
doc.length <- sapply(documents, function(x) sum(x[2, ]))  # number of tokens per document 
N <- sum(doc.length)  # total number of tokens in the data 
term.frequency <- as.integer(term.table)  # frequencies of terms in the corpus

# MCMC and model tuning parameters:
K <- 20
G <- 5000
alpha <- 0.02
eta <- 0.02

# Fit the model with lda library
set.seed(357)
t1 <- Sys.time()
fit <- lda.collapsed.gibbs.sampler(documents = documents, K = K, vocab = vocab, 
                                   num.iterations = G, alpha = alpha, 
                                   eta = eta, initial = NULL, burnin = 0,
                                   compute.log.likelihood = TRUE)
t2 <- Sys.time()
t2 - t1  # about 24 minutes on laptop


####################################
#  To visualize the result using LDAvis, we'll need estimates of the document-topic distributions, 
#     which we denote by the D×K matrix θ, and the set of topic-term distributions, which we denote by
#     the K×W matrix ϕ. We estimate the “smoothed” versions of these distributions 
#     (“smoothed” means that we've incorporated the effects of the priors into the estimates) 
#     by cross-tabulating the latent topic assignments from the last iteration of the collapsed 
#     Gibbs sampler with the documents and the terms, respectively, and then adding pseudocounts 
#     according to the priors. A better estimator might average over multiple iterations of the 
#     Gibbs sampler (after convergence, assuming that the MCMC is sampling within a local mode and
#     there is no label switching occurring), but we won't worry about that for now.

theta <- t(apply(fit$document_sums + alpha, 2, function(x) x/sum(x)))
phi <- t(apply(t(fit$topics) + eta, 2, function(x) x/sum(x)))

# We've already computed the number of tokens per document and 
# the frequency of the terms across the entire corpus. 
# We save these, along with ϕ, θ, and vocab, in a list 
# as the data object MovieReviews, 
# which is included in the LDAvis package.

Particpatory.Assesssment <- list(phi = phi,
                            theta = theta,
                            doc.length = doc.length,
                            vocab = vocab,
                            term.frequency = term.frequency)


########################################
### Visualisation Part

#Now we're ready to call the createJSON() function in LDAvis. 
# This function will return a character string representing 
# a JSON object used to populate the visualization. 
# The createJSON() function computes topic frequencies, 
# inter-topic distances, and projects topics onto a 
# two-dimensional plane to represent their similarity to each other. 
# It also loops through a grid of values of a tuning parameter, 0≤λ≤1, 
# that controls how the terms are ranked for each topic, 
# where terms are listed in decreasing of relevance, where the relevance
# of term w to topic t is defined as λ×p(w∣t)+(1−λ)×p(w∣t)/p(w). 
# Values of λ near 1 give high relevance rankings to frequent terms within a given topic, 
# whereas values of λ near zero give high relevance rankings to exclusive terms within a topic. 
# The set of all terms which are ranked among the top-R most relevant terms for each topic are 
# pre-computed by the createJSON() function and sent to the browser 
# to be interactively visualized using D3 as part of the JSON object.



# create the JSON object to feed the visualization:
json <- createJSON(phi = Particpatory.Assesssment$phi, 
                   theta = Particpatory.Assesssment$theta, 
                   doc.length = Particpatory.Assesssment$doc.length, 
                   vocab = Particpatory.Assesssment$vocab, 
                   term.frequency = Particpatory.Assesssment$term.frequency)
write(json, "data/lda1.json")



# The serVis() function can take json and serve the result in a variety of ways. 
# Here we'll write json to a file within the 'vis' directory 
# (along with other HTML and JavaScript required to render the page).
serVis(json, out.dir = 'vis', open.browser = FALSE)
