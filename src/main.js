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

const grabContent = async(page, selectorStr) => {
  await page.waitForSelector(selectorStr);

  const res = await page.evaluate(allResultsSelector => {
      return [...document.querySelectorAll(allResultsSelector)].map(anchor => {
        const title = anchor.textContent.trim();
        return `${title}`;
      });
    }, selectorStr);
  return res;
}

let defgrabber = async(vocab, nounType) => {
    const browser = await pup.launch();
    const page = await browser.newPage();

    const typeReq = nounType

    await page.goto(`https://www.dictionary.com/browse/${vocab}`);


    const type = await grabContent(page, '.css-69s207');
    type.map(e => e.split(" ")[0]);
    const def = await grabContent(page, '.css-10n3ydx');

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
    
    console.log(`Definition for ${vocab} logged`);

    await browser.close();
};

init();