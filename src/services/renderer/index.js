const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');

const Page = require('../page');

class Renderer {
    constructor(templatePageFirst, templatePage) {
        this.templatePageFirst = templatePageFirst;
        this.templatePage = templatePage;
    }

    async renderMustache(template, model, timestamp, pageNumber = 1) {
        model.pageNum = pageNumber;
        const output = Mustache.render(template, model);

        const page = new Page(output);
        const pdf = await page.pdf();

        const filePath = path.join(__dirname, `../../output/${timestamp}/pages`, `${pageNumber}.pdf`);

        fs.ensureFileSync(filePath);
        fs.outputFileSync(filePath, pdf);

        return filePath;
    }

    async render(model, timestamp) {
        model.offers = model.offers.map((o, id) => ({
            ...o,
            id: id + 1
        }));

        const firstPageModel = Object.assign({}, model);
        const pageModels = [];

        if (model.offers.length > 3) {
            firstPageModel.offers = model.offers.splice(0, 3);
        }

        while (model.offers.length != 0) {
            const pageModel = Object.assign({}, model);

            const chunk = model.offers.splice(0, 5);
            pageModel.offers = chunk;

            pageModels.push(pageModel);
        }

        const firstPageFilepath = await this.renderMustache(this.templatePageFirst, firstPageModel, timestamp);

        const pageFilepaths = await Promise.all(
            pageModels.map(async (pm, i) => 
                await this.renderMustache(this.templatePage, pm, timestamp, i + 2))
        );

        return [firstPageFilepath].concat(pageFilepaths);
    }
}

module.exports = Renderer;