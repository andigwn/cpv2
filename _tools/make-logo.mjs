import sharp from "sharp";

const SRC = "_tools/logo-source.png";
const meta = await sharp(SRC).metadata();

// Square app icon from the "Q" mark on the left of the lockup.
// 0.95x the height keeps the whole mark and excludes the following "U".
const markW = Math.round(meta.height * 0.95);
const mark = () => sharp(SRC).extract({ left: 0, top: 0, width: markW, height: meta.height });
const pad = { r: 0, g: 0, b: 0, alpha: 0 };

const icon = await mark().resize(512, 512, { fit: "contain", background: pad }).png({ compressionLevel: 9 }).toFile("src/app/icon.png");
console.log("icon.png        " + icon.width + "x" + icon.height + "  " + Math.round(icon.size / 1024) + " KB  (crop " + markW + "x" + meta.height + ")");
const apple = await mark().resize(180, 180, { fit: "contain", background: pad }).png({ compressionLevel: 9 }).toFile("src/app/apple-icon.png");
console.log("apple-icon.png  " + apple.width + "x" + apple.height + "  " + Math.round(apple.size / 1024) + " KB");
