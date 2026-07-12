const path = require("path");
const cloudinary = require("./scripts/cloudinary-client");

// Defaults to the photos in this repo; pass another folder as an argument.
const PHOTO_FOLDER =
  process.argv[2] ?? path.join(__dirname, "media", "img", "about");

const COUNT = 35;

async function uploadAll() {
  for (let i = 1; i <= COUNT; i++) {
    const filename = path.join(PHOTO_FOLDER, `about-${i}.jpg`);
    try {
      await cloudinary.uploader.upload(filename, {
        public_id: `about-${i}`,
        overwrite: true,
      });
      console.log(`Uploaded about-${i}`);
    } catch (err) {
      console.error(`Failed about-${i}: ${err.message}`);
    }
  }
}

uploadAll();
