const express = require('express');
const app = express();
const path = require('path');
const formidable = require('formidable');

app.use(express.static('public'))

app.post('/api/upload', (req, res, next) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        console.log(files.upload.filepath);
        run_gc_vision(files.upload.filepath);
    });
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// const filename = 'Local image file, e.g. /path/to/image.png';

// Read a local image as a text document
async function run_gc_vision(filename) {
    const [result] = await client.documentTextDetection(filename);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
}