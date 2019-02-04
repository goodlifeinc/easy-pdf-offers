var ElectronPDF = require( 'electron-pdf' )

var exporter = new ElectronPDF()
exporter.on( 'charged', () => {
    const jobOptions = {
        /**
          r.results[] will contain the following based on inMemory
            false: the fully qualified path to a PDF file on disk
            true: The Buffer Object as returned by Electron
          
          Note: the default is false, this can not be set using the CLI
         */
        inMemory: false
    }
    const options = {
        pageSize: "A4"
    }
    exporter.createJob( source, target, options, jobOptions ).then( job => {
        job.on( 'job-complete', ( r ) => {
            console.log( 'pdf files:', r.results )
            // Process the PDF file(s) here
        } )
        job.render()
    } )
} )
exporter.start();