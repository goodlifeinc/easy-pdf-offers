const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const renderMustache = (template, model, pageNumber = 1) => {
    model.pageNum = pageNumber;
    const output = Mustache.render(template, model);

    fs.writeFileSync(path.join(__dirname, '/template/rendered', `mustacheOutput.${pageNumber}.html`), output);

    console.log('Success Mustache');
}

const model = JSON.parse(fs.readFileSync(path.join(__dirname, '/template/model.json'), 'utf8'));

const templatePageFirst = fs.readFileSync(path.join(__dirname, '/template/index.mustache.html'), 'utf8');
const templatePage = fs.readFileSync(path.join(__dirname, '/template/page.mustache.html'), 'utf8');

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

renderMustache(templatePageFirst, firstPageModel);

pageModels.map((pm, i) => renderMustache(templatePage, pm, i + 2));
