const express = require('express');
const path = require('path');
// required library
const multer = require('multer');

const app = express();

// upload folder location
const UPLOADS_FOLDER = './uploads/';

// define the storage
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
                // filter & make file name for store in system
                // extruct the extension
                const fileExtName = path.extname(file.originalname);
                // filter filename
                const fileName = file.originalname
                                        .replace(fileExtName, "")
                                        .toLowerCase()
                                        .split(" ")
                                        .join("-") + "-" + Date.now();
                cb(null, fileName + fileExtName);
        }
});



// instantiate multer with paramters
const upload = multer({
        storage: storage,
        limits: {
                fileSize: 2000000,
        },
        fileFilter: (req, file, cb) => {
                if(file.fieldname === 'photos') {
                        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === '') {
                                cb(null, true);
                        } else {
                                cb(new Error('Only .jpg, .png or .jpeg are allowed !'), false);
                        }
                } else if(file.fieldname === 'pdf') {
                        if(file.mimetype === 'application/pdf') {
                                cb(null, true);
                        } else {
                                cb(new Error('Only .pdf are allowed'));
                        }
                } else {
                        cb(new Error('Format now allowed'));
                }
        }
});

// for single file upload
app.post('/', upload.fields([
        { name: 'photos', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
]), (req, res) => {
        res.send('Successfull');
});

app.use((err, req, res, next) => {
        if (err) {
                // multer specifiq error
                if (err instanceof multer.MulterError) {
                        res.status(500).send(`Upload failed: ${err.message}`);
                } else {
                        res.status(500).send(err.message);
                }
        }
});



app.listen(3000, () => {
        console.log("Server is running on PORT=3000");
})