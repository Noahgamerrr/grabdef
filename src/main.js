const pup = require("puppeteer");

(async() => {
    const browser = await pup.launch();
    const page = await browser.newPage();

    const typeReq = "verb"

    await page.goto("https://www.dictionary.com/browse/permit");

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

    console.log(res[0]);
    

    await browser.close();
})();