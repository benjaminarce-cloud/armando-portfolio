// lib/cloudinary.ts
export function cldVideo(publicId: string) {
  // publicId example: "Basketball-6-preview_ujmwqc"
  return `https://res.cloudinary.com/dzjcndphq/video/upload/f_auto,q_auto/${publicId}.mp4`;
}
