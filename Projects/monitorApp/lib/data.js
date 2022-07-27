// Dependecies
const fs = require('fs');
const path = require('path');

// App object - Module Scafolding
const lib = {};

// base directory of the data folder.
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to the file
// receive for argument, a directory name, a file name, the corresponding data
// and callback function
lib.create = (dir, file, data, callback) => {
    // open file for writing 
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (openErr, fileDescriptor) => {
        if (!openErr && fileDescriptor) {
            // convert data to string
            const dataString = JSON.stringify(data);
            // write data to the file
            fs.writeFile(fileDescriptor, dataString, (writeErr) => {
                if (!writeErr) {
                    fs.close(fileDescriptor, (closeErr) => {
                        if (!closeErr) {
                            callback(false);
                        } else {
                            callback(`Error in file closing: \n${closeErr}`);
                        }
                    });
                } else {
                    callback(`Error in file writing: \n${writeErr}`);
                }
            });
        } else {
            callback(Error(`Error in file opening: \n${openErr}`));
        }
    });
}


// read from the file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
}



// update the file
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (openErr, fileDescriptor) => {
        if (!openErr && fileDescriptor) {
            // convert data to string
            const dataString = JSON.stringify(data);
            // delete data from the file
            fs.ftruncate(fileDescriptor, (truncateErr) => {
                if (!truncateErr) {
                    // write to file
                    fs.writeFile(fileDescriptor, dataString, (writeErr) => {
                        if (!writeErr) {
                            // close the file
                            fs.close(fileDescriptor, (closeErr) => {
                                if (!closeErr) {
                                    callback(false);
                                } else {
                                    callback(`Error in file closing: \n${closeErr}`);
                                }
                            })
                        } else {
                            callback(`Error in write to file: \n${writeErr}`);
                        }
                    });
                } else {
                    callback(`Error in file truncatation: \n${truncateErr}`);
                }
            });
        } else {
            callback(`Error in file openign: \n${openErr}`);
        }
    });
}



// delete file
lib.delete = (dir, file, callback) => {
    // unlink or deletation of a file
    fs.unlink(`${lib.baseDir + dir}/${file}.json`, (unlinkErr) => {
        unlinkErr ? callback(`Error in file deletation ${unlinkErr}`)
            : callback(false);
    });
}


// list all the files name in a directory
lib.listAllFileName = (dir, callback) => {
    fs.readdir(`${lib.baseDir + dir}/`, (readErr, allFileNames) => {
        // read all file names of a directory.
        if(!readErr && allFileNames && allFileNames.length > 0) {
            // remove  the .json extension from the files names
            const removeJSONFromFileName = [];
            allFileNames.forEach(fileName => {
                removeJSONFromFileName.push(fileName.replace('.json', ''));
            });
            callback(false, {
                'checksArr': removeJSONFromFileName,
            });
        } else {
            callback(500, {
                err: `Can't read data from the file, ${readErr}`,
            });
        }
    });
}






module.exports = lib;