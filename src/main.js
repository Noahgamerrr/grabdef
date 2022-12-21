const pup = require("puppeteer");
const fs = require('fs');

let vocabs = []; //Array in which the words will be saved

//Splits the vocabs/vocabs.txt file in lines so that the vocabs can be saved in the array
const allFileContents = fs.readFileSync('./src/vocabs/vocabs.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
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
const init = async() => {
  initFile()
  for(const data of vocabs) {
    await defgrabber(data[0], data[1]);
  }
}

/** 
 * Function which grabs all the definitions from the page
 * @param page the webpage it loads from
 * @param {string} selectorStr the string from which the elements will be selected
*/
const grabContent = async(page, selectorStr) => {
  //initializes the selector
  await page.waitForSelector(selectorStr);

  //finds all the definitions from the webpage
  const res = await page.evaluate(allResultsSelector => {
      return [...document.querySelectorAll(allResultsSelector)].map(anchor => {
        const title = anchor.textContent.trim();
        return `${title}`;
      });
    }, selectorStr);
  return res;
}

/**
 * Main function, which loads all the definitions
 * and saves them in vocabs/defs.txt
 * @param {*} vocab the vocabulary
 * @param {*} wordType the word type (e.g. noun, verb, etc.)
 */

let defgrabber = async(vocab, wordType) => {
    //starts the browser running in the background;
    const browser = await pup.launch();
    //initializes a page on the browser
    const page = await browser.newPage();

    //loads the webpage dictionary.com
    await page.goto(`https://www.dictionary.com/browse/${vocab}`);

    //gets the wordtypes of the definition from the webpage
    const type = await grabContent(page, '.css-69s207');
    //gets the definitions from the webpage
    const def = await grabContent(page, '.css-10n3ydx');

    //saves the definitions, where the word type is equal to the prefered one.
    const res = [];

    //goes through every definition
    for (let i = 0; i < def.length; i++) {
        /*if the word type fits, then save all the definitions in def
          since the word types in type might be elaborated, they
          must be stripped from any additional text.
        */
        if (type[i].split(" ")[0] == wordType) {
            //split the entries into definition and example
            for (let data of def[i].split(/[\.:]/g)) res.push(data);
        }
    }

    //format the first definition (often the best one)
    const resultingDef = vocab +": " +res[0] +"\n";
    //save the first definition in the file
    fs.appendFile("./src/vocabs/defs.txt", resultingDef, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    
    //alert the user that a definition has been found
    console.log(`Definition for ${vocab} logged`);

    await browser.close();
};

init();