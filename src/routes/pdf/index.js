const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const Merger = require('../../services/merger');
const Renderer = require('../../services/Renderer');

const routes = [{
  method: 'GET',
  path: '/pdf',
  async handler(request, h) {
    const firstPageTemplate = fs.readFileSync(path.join(__dirname, '../../services/renderer/templates/default/index.mustache.html'), 'utf8');
    const pageTemplate = fs.readFileSync(path.join(__dirname, '../../services/renderer/templates/default/page.mustache.html'), 'utf8');
    const model = JSON.parse(fs.readFileSync(path.join(__dirname, '../../services/renderer/templates/default/model.json')));

    const unique = `${(new Date()).getTime()}`;

    const dirname = path.join(__dirname, '../../output', `${unique}`);
    const filename = 'offer.pdf';
    const destinationFilePath = path.join(dirname, filename);
    fse.ensureFileSync(destinationFilePath);

    const rendererInstance = new Renderer(firstPageTemplate, pageTemplate);

    const fileNames = await rendererInstance.render(model, unique);

    const mergerInstance = new Merger(fileNames, destinationFilePath);
    let output = 'error';
    try {
      output = mergerInstance.merge();
    } catch (e) {
      console.log('error');
    }
    const file = fs.readFileSync(output);

    fse.removeSync(dirname);

    return h.response(file).header('Content-Disposition', `attachment; filename=${filename}`);
  },
}];

module.exports = routes;
