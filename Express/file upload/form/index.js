const express = require('express');
const res = require('express/lib/response');
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
app.post('/', upload.none(), (req, res) => {
        res.send('Successfull');
});


app.use((err, req, res, next) => {
        if (err) {
                res.send("Upload failed");
        } else {
                res.send('Upload successfull');
        }
});

app.listen(3000, () => {
        console.log("Server is running on PORT=3000");
})