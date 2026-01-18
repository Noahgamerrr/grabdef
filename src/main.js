const fs = require('fs');

let vocabs = []; //Array in which the words will be saved

//Splits the vocabs/vocabs.txt file in lines so that the vocabs can be saved in the array
const allFileContents = fs.readFileSync('./src/vocabs/vocabs.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {
    console.log(`Line from file: ${line}`);
    let data = [line.split("|")[0], line.split("|")[1]]; //data[vocab, word type (e.g. noun, verb etc.)
    vocabs.push(data);
});

/**clears all content from the file*/
function initFile() {
    fs.writeFile("./src/vocabs/defs.txt", "", (err) => {
        if (err) {
            console.log(err);
            return;
        }
    })
}

/**Calls the defgrabber function for every vocab*/
const init = async () => {
    initFile();
    
    //fetch all definitions
    for (const data of vocabs) {
        await defgrabber(data[0], data[1]);
        //slowing down the script because otherwise the api-endpoint seems to fail.
        await new Promise(res => setTimeout(res, 1000));
    }
}

/**
 * Main function, which loads all the definitions
 * and saves them in vocabs/defs.txt
 * @param {string} vocab the vocabulary
 * @param {string} wordType the word type (e.g. noun, verb, etc.)
 * @returns the definition of the word
 */
let defgrabber = async (vocab, wordType) => {
    try {
        //fetch response from api
        const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${vocab}`);
        //fetch body from response
        const data = await resp.json();
        //fetch definitions from body
        const definitions = data[0].meanings.find(d => d.partOfSpeech == wordType).definitions;
        //select first definition
        const definition = definitions[0].definition;
        //save the first definition in the file
        fs.appendFile("./src/vocabs/defs.txt", `${vocab}: ${definition}\n`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    } catch(err) {
        console.log("Could not find definition");
        fs.appendFile("./src/vocabs/defs.txt", `${vocab}: ---\n`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    }
};

init();