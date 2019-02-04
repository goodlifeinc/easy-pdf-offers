const path = require('path');
const merge = require('easy-pdf-merge');

const source_files = ['exporter1.pdf', 'exporter2.pdf', 'exporter3.pdf', 'exporter4.pdf', 'exporter5.pdf'].map(f => path.join(__dirname, `/template/pdf/${f}`));
const dest_file_path = ['exporter.pdf'].map(f => path.join(__dirname, `/template/pdf/${f}`));

merge(source_files, dest_file_path, function (err) {

    if (err)
        return console.log(err);

    console.log('Success');

});