const key = require('./config.js');
const Backend = require('./backend.js');
const natural = require('natural');
const dictionary = require('./emotions.js');
const emotions = dictionary.dictionary[0]["emotions"]

// const classifier = new natural.BayesClassifier();
// const tokeniser = new natural.WordTokenizer();

// console.log(tokeniser.tokenize("I am a sad egg"));

// const stems = "I would prefer to be more abhorrent tbh".tokenizeAndStem();
// console.log(spellcheck.getCorrections(stems[0],2));

const tokeniser = (sentence)=>{
    natural.PorterStemmer.attach();
    return sentence.tokenizeAndStem();
}

const spellChecker = (words)=>{
    const spellcheck = new natural.Spellcheck(emotions)
    const moods = spellcheck.getCorrections(words.slice(0, 2),2);
    console.log(`your mood is ${moods}`)
    return moods[0];
}

const antonymFinder = (word)=>{
    if(!word){
        const word = emotions[Math.floor((Math.random() * (emotions.length-1)))]
    }
    const thesaurus = new Backend();
    thesaurus.setBaseUrl("https://www.dictionaryapi.com/api/v3/references/thesaurus/json")
    return thesaurus.get(`/${word}?key=${key.api}`)
    .then(data=> data[0]["meta"]["ants"])
    .then(data=>showAntonyms(data))
    .catch(console.log);
}

const showAntonyms = (data)=>{
    try{
        if(data.length<1){
        throw new Error("no antonyms")
    }
    return data[0][0];
}
    catch(err){
        console.log(err);
    }   
}




module.exports = {
    tokeniser, spellChecker, antonymFinder
}
