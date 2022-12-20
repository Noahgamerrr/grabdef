const pup = require("puppeteer");

(async() => {
    const browser = await pup.launch();
    const page = await browser.newPage();

    await page.goto("https://www.dictionary.com/browse/permit");

    const allResultsSelector = '.css-10n3ydx';
    await page.waitForSelector(allResultsSelector);

    const def = await page.evaluate(allResultsSelector => {
        return [...document.querySelectorAll(allResultsSelector)].map(anchor => {
          const title = anchor.textContent.split('|')[0].trim();
          return `${title} - ${anchor.href}`;
        });
      }, allResultsSelector);

    console.log(def.join('\n'));
    

    await browser.close();
})();