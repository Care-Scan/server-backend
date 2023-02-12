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

exports.run_gc_vision = run_gc_vision;