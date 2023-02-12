const express = require('express');
const app = express();
const formidable = require('formidable');
const service = require('./services/gc_vision')
const path = require('path');
const uploadFolder = path.join(__dirname, "public");

app.use(express.static(__dirname + '/public'));

app.get("/api", (req, res) => {
    res.send({ message: "Hello from server!" });
  });

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
        console.log(files.upload.filepath);
        // service.run_gc_vision(files.upload.filepath);
    });
});

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001 ...');
});