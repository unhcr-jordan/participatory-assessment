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

## Getting rid of the /t characters so that it's more acceptable to the tm package
#data.new <- apply(as.matrix(data), 1, function (x) gsub('\t',' ', x))
data.new <- data

## Check
data.new.df <- as.data.frame(data.new)

## We can start building the corpus 
data.corpus <- Corpus(VectorSource(data.new))

# make each letter lowercase
data.corpus <- tm_map(data.corpus, tolower) 

# remove punctuation 
data.corpus <- tm_map(data.corpus, removePunctuation)

# remove generic and custom stopwords
my_stopwords <- c(stopwords('english'), 'syrian', 'syrians')
data.corpus <- tm_map(data.corpus, removeWords, my_stopwords)

## Build the the document term Matrix
data.dtm <- DocumentTermMatrix(data.corpus)



# We can filter out any terms that have shown up in less than 10 records
#data.dict <- Dictionary(findFreqTerms(data.dtm,10))
data.dict <- findFreqTerms(data.dtm,10)
data.dtm.filtered <- DocumentTermMatrix(data.corpus, list(dictionary = data.dict))

# Here I get a count of number of issues in each document with the intent of deleting any documents with 0 issues
issues.counts <- apply(data.dtm.filtered, 1, function (x) sum(x))
data.dtm.filtered <- data.dtm.filtered[issues.counts > 0]

### Checking through visualisation
# Get some simple issue frequencies to plot in order to decide which can be filtered out
data.m <- as.matrix(data.dtm.filtered)
popularity.of.issues <- sort(colSums(data.m), decreasing=TRUE)
popularity.of.issues <- data.frame(issues = names(popularity.of.issues), num_recipes=popularity.of.issues)
popularity.of.issues$issues <- reorder(popularity.of.issues$issues, popularity.of.issues$num_recipes)

### A quick plot to visualise 
plot_issues <- ggplot(popularity.of.issues[1:30,], aes(x=issues, y=num_recipes)) +
  geom_point(size=5, colour="red") + 
  coord_flip() +
  ggtitle("Recipe Popularity of Top 30 issues") + 
  theme(axis.text.x=element_text(size=13,face="bold", colour="black"), 
        axis.text.y=element_text(size=13,colour="black", face="bold"),
        axis.title.x=element_text(size=14, face="bold"), 
        axis.title.y=element_text(size=14,face="bold"),
        plot.title=element_text(size=24,face="bold"))



# may need to remove some word from the corpus and redo the document term matrix and relaunch the analysis
data.corpus <- tm_map(data.corpus, removeWords, c("mywordhere", "mywordhere2"))  # Go back to line 6
data.dtm.final <- DocumentTermMatrix(data.corpus, list(dictionary = data.dict))

extendedstopwords=c("a","about","above","across","after","MIME Version","forwarded","again","against","all","almost","alone","along","already","also","although","always","am","among","an","and","another","any","anybody","anyone","anything","anywhere","are","area","areas","aren't","around","as","ask","asked","asking","asks","at","away","b","back","backed","backing","backs","be","became","because","become","becomes","been","before","began","behind","being","beings","below","best","better","between","big","both","but","by","c","came","can","cannot","can't","case","cases","certain","certainly","clear","clearly","come","could","couldn't","d","did","didn't","differ","different","differently","do","does","doesn't","doing","done","don't","down","downed","downing","downs","during","e","each","early","either","end","ended","ending","ends","enough","even","evenly","ever","every","everybody","everyone","everything","everywhere","f","face","faces","fact","facts","far","felt","few","find","finds","first","for","four","from","full","fully","further","furthered","furthering","furthers","g","gave","general","generally","get","gets","give","given","gives","go","going","good","goods","got","great","greater","greatest","group","grouped","grouping","groups","h","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","her","here","here's","hers","herself","he's","high","higher","highest","him","himself","his","how","however","how's","i","i'd","if","i'll","i'm","important","in","interest","interested","interesting","interests","into","is","isn't","it","its","it's","itself","i've","j","just","k","keep","keeps","kind","knew","know","known","knows","l","large","largely","last","later","latest","least","less","let","lets","let's","like","likely","long","longer","longest","m","made","make","making","man","many","may","me","member","members","men","might","more","most","mostly","mr","mrs","much","must","mustn't","my","myself","n","necessary","need","needed","needing","needs","never","new","newer","newest","next","no","nobody","non","noone","nor","not","nothing","now","nowhere","number","numbers","o","of","off","often","old","older","oldest","on","once","one","only","open","opened","opening","opens","or","order","ordered","ordering","orders","other","others","ought","our","ours","ourselves","out","over","own","p","part","parted","parting","parts","per","perhaps","place","places","point","pointed","pointing","points","possible","present","presented","presenting","presents","problem","problems","put","puts","q","quite","r","rather","really","right","room","rooms","s","said","same","saw","say","says","second","seconds","see","seem","seemed","seeming","seems","sees","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","show","showed","showing","shows","side","sides","since","small","smaller","smallest","so","some","somebody","someone","something","somewhere","state","states","still","such","sure","t","take","taken","than","that","that's","the","their","theirs","them","themselves","then","there","therefore","there's","these","they","they'd","they'll","they're","they've","thing","things","think","thinks","this","those","though","thought","thoughts","three","through","thus","to","today","together","too","took","toward","turn","turned","turning","turns","two","u","under","until","up","upon","us","use","used","uses","v","very","w","want","wanted","wanting","wants","was","wasn't","way","ways","we","we'd","well","we'll","wells","went","were","we're","weren't","we've","what","what's","when","when's","where","where's","whether","which","while","who","whole","whom","who's","whose","why","why's","will","with","within","without","won't","work","worked","working","works","would","wouldn't","x","y","year","years","yes","yet","you","you'd","you'll","young","younger","youngest","your","you're","yours","yourself","yourselves","you've","z")

dtm.control = list(
  tolower = T,
  removePunctuation = T,
  removeNumbers = T,
  stopwords = c(stopwords("english"),extendedstopwords),
  stemming = T,
  wordLengths = c(3,Inf),
  weighting = weightTf)

dtm = DocumentTermMatrix(data.corpus, control=dtm.control)
dtm = removeSparseTerms(dtm,0.999)
dtm = dtm[rowSums(as.matrix(dtm))>0,]
k = 4


# build a term-document matrix
mydata.dtm <- TermDocumentMatrix(data.corpus)

# inspect most popular words
findFreqTerms(mydata.dtm, lowfreq=30)

### Word Cloud: Show the importance of words with a word cloud (also kown as a tag cloud) .
# Term Document Matrix
myDtm <- as.matrix(TermDocumentMatrix(data.corpus, control=dtm.control ))

# calculate the frequency of words
v <- sort(rowSums(term.matrix), decreasing=TRUE)
myWord <- names(v)

# Potentially replace some word
#k <- which(names(v)=="wordtobereplaced")
#myWord[k] <- "replacingword"
myWord.dataframe <- data.frame(word=myWord, freq=v)

## Finally build the wordcloud and save it to a png image
png(filename="images/wordcloud.png")
wordcloud(myWord.dataframe$word, myWord.dataframe$freq, min.freq=25)
dev.off()


### Now we compute the model - Beware: this step takes a lot of patience!
lda.model = LDA(dtm, k)

# This enables you to examine the words that make up each topic that was calculated.  Bear in mind that I've chosen to stem all words possible in this corpus, so some of the words output will look a little weird.
terms(lda.model,20)

# Here I construct a dataframe that scores each document according to how closely its content matches up with each topic. 
# The closer the score is to 0, the more likely its content matches up with a particular topic. 

emails.topics = posterior(lda.model, dtm)$topics
df.emails.topics = as.data.frame(emails.topics)
df.emails.topics = cbind(email=as.character(rownames(df.emails.topics)), 
                         df.emails.topics, stringsAsFactors=F)


# Finally, run the LDA and extract the 5 most characteristic issues in each topic
data.lda <- LDA(data.dtm.filtered, 50)
t <- terms(data.lda,5)
