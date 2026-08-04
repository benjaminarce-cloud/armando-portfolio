/**
 * Push everything in build/media to Cloudinary under the `mando/` folder.
 *
 * The public id is the filename without its extension, so build/media/reel.mp4
 * lands at `mando/reel` — which is exactly what lib/media.ts builds URLs for.
 * Re-running overwrites in place, so a re-transcode of one clip can be pushed
 * on its own without touching the rest.
 *
 * Usage:
 *   npm run cloudinary:upload            # everything not already there
 *   npm run cloudinary:upload -- --force # re-upload even if present
 *   npm run cloudinary:upload -- reel    # just the ids matching a substring
 */

const fs = require("node:fs");
const path = require("node:path");
const cloudinary = require("./cloudinary-client");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "build", "media");
const FOLDER = "mando";

const args = process.argv.slice(2);
const force = args.includes("--force");
const filters = args.filter((a) => !a.startsWith("--"));

async function alreadyThere(publicId, resourceType) {
  try {
    await cloudinary.api.resource(publicId, { resource_type: resourceType });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!fs.existsSync(DIR)) {
    console.error(
      `No build/media. Run scripts/transcode.sh and scripts/prep-photos.sh first.`
    );
    process.exit(1);
  }

  const files = fs
    .readdirSync(DIR)
    .filter((f) => /\.(mp4|jpg)$/i.test(f))
    .filter((f) => filters.length === 0 || filters.some((s) => f.includes(s)))
    .sort();

  if (files.length === 0) {
    console.error("Nothing matched.");
    process.exit(1);
  }

  let done = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const ext = path.extname(file);
    const slug = path.basename(file, ext);
    const publicId = `${FOLDER}/${slug}`;
    const resourceType = ext.toLowerCase() === ".mp4" ? "video" : "image";
    const bytes = fs.statSync(path.join(DIR, file)).size;
    const mb = (bytes / 1024 / 1024).toFixed(1);

    if (!force && (await alreadyThere(publicId, resourceType))) {
      console.log(`--  ${publicId} (already there)`);
      skipped++;
      continue;
    }

    process.stdout.write(`->  ${publicId} (${mb} MB) ... `);

    try {
      await cloudinary.uploader.upload_large(path.join(DIR, file), {
        public_id: publicId,
        resource_type: resourceType,
        overwrite: true,
        invalidate: true,
        // 20 MB parts: comfortably under the single-request cap, so the big
        // films go up in pieces instead of failing outright.
        chunk_size: 20 * 1024 * 1024,
      });
      console.log("ok");
      done++;
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${done} uploaded, ${skipped} skipped, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main();
