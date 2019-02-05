const easyMerge = require('easy-pdf-merge');

class Merger {
  constructor(sourceFiles, destinationPath) {
    this.source_files = sourceFiles;
    this.destination_file_path = destinationPath;
  }

  merge() {
    return new Promise((resolve, reject) => {
      const destinationpath = this.destination_file_path;
      easyMerge(this.source_files, destinationpath, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(destinationpath);
      });
    });
  }
}

module.exports = Merger;
