const path = require('path');
const merge = require('easy-pdf-merge');

const source_files = ['page1.pdf', 'page2.pdf', 'page3.pdf', 'page4.pdf', 'page5.pdf'].map(f => path.join(__dirname, `/template/pdf/${f}`));
const dest_file_path = ['catalog.pdf'].map(f => path.join(__dirname, `/template/pdf/${f}`));

merge(source_files, dest_file_path, function (err) {

    if (err)
        return console.log(err);

    console.log('Success');

});