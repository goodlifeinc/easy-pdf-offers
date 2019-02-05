const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');

const Page = require('../page');

async function renderMustache(template, model, timestamp, pageNumber = 1) {
  const modelCopy = Object.assign({}, model);
  modelCopy.pageNum = pageNumber;
  const output = Mustache.render(template, model);

  const page = new Page(output);
  const pdf = await page.pdf();

  const filePath = path.join(__dirname, `../../output/${timestamp}/pages`, `${pageNumber}.pdf`);

  fs.ensureFileSync(filePath);
  fs.outputFileSync(filePath, pdf);

  return filePath;
}

class Renderer {
  constructor(templatePageFirst, templatePage) {
    this.templatePageFirst = templatePageFirst;
    this.templatePage = templatePage;
  }

  async render(model, timestamp) {
    const modelCopy = Object.assign({}, model);
    modelCopy.offers = modelCopy.offers.map((o, id) => ({
      ...o,
      id: id + 1,
    }));

    const firstPageModel = Object.assign({}, modelCopy);
    const pageModels = [];

    if (modelCopy.offers.length > 3) {
      firstPageModel.offers = model.offers.splice(0, 3);
    }

    while (modelCopy.offers.length !== 0) {
      const pageModel = Object.assign({}, modelCopy);

      const chunk = modelCopy.offers.splice(0, 5);
      pageModel.offers = chunk;

      pageModels.push(pageModel);
    }

    const firstPageFilepath = await renderMustache(
      this.templatePageFirst, firstPageModel, timestamp,
    );

    const pageFilepaths = await Promise.all(
      pageModels.map(async (pm, i) => renderMustache(this.templatePage, pm, timestamp, i + 2)),
    );

    return [firstPageFilepath].concat(pageFilepaths);
  }
}

module.exports = Renderer;
