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

exports.run_gc_vision = run_gc_vision;