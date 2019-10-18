"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//import abd from "../assets/courseImages"
const resizeImage = (sourcePath, destinationPath, width) => __awaiter(void 0, void 0, void 0, function* () {
    const lenna = yield jimp_1.default.read(sourcePath);
    lenna
        .resize(width, jimp_1.default.AUTO)
        .quality(100)
        .write(destinationPath); // save
    return true;
});
exports.resizeImage = resizeImage;
// Upload image File using multer
var storageFile = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path_1.default.join(__dirname, "..", "assets", "images"));
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
exports.storageFile = storageFile;
