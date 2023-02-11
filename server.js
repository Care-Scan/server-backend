// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Read a local image as a text document
async function start() {
const [result] = await client.documentTextDetection("sample.png");
const fullTextAnnotation = result.fullTextAnnotation;
console.log(`Full text: ${fullTextAnnotation.text}`);
}

start()