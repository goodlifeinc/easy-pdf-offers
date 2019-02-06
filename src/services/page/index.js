const Puppeteer = require('puppeteer');

class Page {
  constructor(html) {
    this.html = html;
  }

  async pdf() {
    const browser = await Puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(this.html);

    const pdf = await page.pdf();

    await browser.close();
    return pdf;
  }
}

module.exports = Page;
