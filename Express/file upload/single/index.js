const express = require('express');
// required library
const multer = require('multer');

const app = express();

// upload folder location
const UPLOADS_FOLDER = './uploads/';

// instantiate multer with paramters
const upload = multer({
        dest: UPLOADS_FOLDER,
});

// for single file upload
app.post('/', upload.single('files'), (req, res) => {
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