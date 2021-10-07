const puppeteer = require('puppeteer');

(async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1300,
        height: 2000,
        deviceScaleFactor: 1
    })
    await page.goto('https://bqshina.github.io/My-Portfolio/');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    await browser.close();
})();