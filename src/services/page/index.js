const Puppeteer = require('puppeteer');

class Page {
  constructor(html) {
    this.html = html;
  }

  async pdf() {
    const browser = await Puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
    const page = await browser.newPage();
    await page.setContent(this.html);

    return page.pdf();
  }
}

module.exports = Page;
