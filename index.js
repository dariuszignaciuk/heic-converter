const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');
const path = require('path');

const srcDirPath = "./src";
const resultDirPath = "./result";
const outputFormat = "JPEG";

(async ()=>{
    try {
        const files = await fs.promises.readdir( srcDirPath );
       
        for( const [index, file] of files.entries()) {
            const fromPath = path.join( srcDirPath, file );
            const toPath = path.join( resultDirPath, file.replace("heic", outputFormat));

            const inputBuffer = await promisify(fs.readFile)(fromPath);
            console.log(`Converting: ${index}/${files.length}`);
            
            const outputBuffer = await convert({
              buffer: inputBuffer, 
              format: outputFormat,     
              quality: 0.5 // the jpeg compression quality, between 0 and 1
            });
          
            await promisify(fs.writeFile)(toPath, outputBuffer);
            console.log("Converted:", toPath);
        }
    }
    catch( e ) {
        console.error( "Whoops!", e );
    }

})();
