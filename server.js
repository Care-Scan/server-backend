const express = require('express');
const app = express();
const formidable = require('formidable');
// const service = require('./services/gc_vision')
const path = require('path');
const uploadFolder = path.join(__dirname, "public");
var cors = require('cors')
app.use(cors())

let patient_json = "";

app.use(express.static(__dirname + '/public'));

app.post('/api/upload', (req, res, next) => {

    const form = formidable({ uploadDir: uploadFolder,
                              keepExtensions: true,
                              filename: (function (name, ext, part, form){return "test.png"}),
                              });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        run_gc_vision(files.upload.filepath).then(result => {
            patient_json = JSON.stringify(result);
            console.log(result)
        }
        ).catch(error => {
            console.log(error)
        });
    });
    res.redirect('/')
});

app.get("/api", (req, res) => {
    //console.log(patient_json);
    res.send(patient_json);
  });

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001 ...');
});

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// const filename = 'Local image file, e.g. /path/to/image.png';

// Read a local image as a text document
async function run_gc_vision(filename) {
    let jsonTextAnnotation={};
    const [result] = await client.documentTextDetection(filename);
    const fullTextAnnotation = result.fullTextAnnotation.text;
    // console.log(`Full text: ${fullTextAnnotation}`);
    fullTextAnnotation.slice(fullTextAnnotation.indexOf("Patient name")).split("\n").forEach((key) => jsonTextAnnotation[key.split(":")[0]] = key.split(":")[1]);
    // console.log(jsonTextAnnotation);
    return jsonTextAnnotation;
}
