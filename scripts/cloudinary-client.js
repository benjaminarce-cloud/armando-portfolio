const cloudinary = require("cloudinary").v2;

const REQUIRED = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = REQUIRED.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(
    `Missing Cloudinary credentials: ${missing.join(", ")}\n\n` +
      `Copy .env.example to .env.local and fill it in, then run this script\n` +
      `through npm (npm run cloudinary:list) so the env file gets loaded.`
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
