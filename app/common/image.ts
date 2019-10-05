import Jimp from "jimp";
import multer, { StorageEngine } from "multer";
import path from "path";
//import abd from "../assets/courseImages"

const resizeImage = async (
  sourcePath: any,
  destinationPath: any,
  width: any
) => {
  const lenna = await Jimp.read(sourcePath);
  lenna
    .resize(width, Jimp.AUTO)
    .quality(100)
    .write(destinationPath); // save
  return true;
};

// Upload image File using multer
var storageFile: StorageEngine = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, "..", "assets", "images"));
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

export { resizeImage, storageFile };
