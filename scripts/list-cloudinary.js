const cloudinary = require("./cloudinary-client");

async function listPosters() {
  const images = await cloudinary.api.resources({
    type: "upload",
    resource_type: "image",
    max_results: 500,
  });

  const posters = images.resources.filter((r) =>
    r.public_id.includes("poster")
  );

  console.log("=== POSTERS ===");
  posters.forEach((r) => console.log(r.public_id));
}

listPosters();
