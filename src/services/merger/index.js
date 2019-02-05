const easyMerge = require('easy-pdf-merge');

class Merger {
    constructor(source_files_paths, destination_file_path) {
        this.source_files = source_files_paths;
        this.destination_file_path = destination_file_path;
    }
    async merge() {
        return await new Promise((resolve, reject) => {
            const destinationpath = this.destination_file_path;
            easyMerge(this.source_files, destinationpath, function (err) {
                if (err) {
                    return reject(err)
                }
                return resolve(destinationpath);
            });
        })
    }
}

module.exports = Merger;
