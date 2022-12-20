const pup = require("puppeteer");
const fs = require('fs');

let vocabs = [];

const allFileContents = fs.readFileSync('./src/vocabs/vocabs.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  console.log(`Line from file: ${line}`);
  let data = [line.split("|")[0], line.split("|")[1]];
  vocabs.push(data);
});

const init = async() => {
  for(const data of vocabs) {
    await defgrabber(data[0], data[1]);
  }
}

let defgrabber = async(vocab, nounType) => {
    const browser = await pup.launch();
    const page = await browser.newPage();

    const typeReq = nounType

    await page.goto(`https://www.dictionary.com/browse/${vocab}`);

    const typeSelector = '.css-69s207';
    await page.waitForSelector(typeSelector);

    const type = await page.evaluate(allResultsSelector => {
        return [...document.querySelectorAll(allResultsSelector)].map(anchor => {
          const title = anchor.textContent.split(' ')[0].trim();
          return `${title} - ${anchor.href}`;
        });
      }, typeSelector);

    const defSelector = '.css-10n3ydx';
    await page.waitForSelector(defSelector);

    const def = await page.evaluate(allResultsSelector => {
        return [...document.querySelectorAll(allResultsSelector)].map(anchor => {
          const title = anchor.textContent.trim();
          return `${title} - ${anchor.href}`;
        });
      }, defSelector);

    const res = [];

    for (let i = 0; i < def.length; i++) {
        if (type[i].split(" ")[0] == typeReq) {
            for (let data of def[i].split(/[\.:]/g)) res.push(data);
        }
    }
    const resultingDef = vocab +": " +res[0] +"\n";
    fs.appendFile("./src/vocabs/defs.txt", resultingDef, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    

    await browser.close();
};

init();