const express = require("express");
const app = express();
const formidable = require("formidable");
const path = require("path");
const uploadFolder = path.join(__dirname, "public");

app.use(express.static(__dirname + "/public"));

app.listen(4000, () => {
  console.log("Server listening on Port 4000 ...");
});

app.post("/api/upload", (req, res, next) => {
  const form = formidable({
    uploadDir: uploadFolder,
    keepExtensions: true,
    filename: function (name, ext, part, form) {
      return "test.png";
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(files.upload.filepath);
    run_gc_vision(files.upload.filepath);
  });
});

const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

async function run_gc_vision(filename) {
  const [result] = await client.documentTextDetection(filename);
  const fullTextAnnotation = result.fullTextAnnotation;
  app.get("/data", (req, res) => {
    res.send({
      parsedData: fullTextAnnotation.text
    });
  });
}
