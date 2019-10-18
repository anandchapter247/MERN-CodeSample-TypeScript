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
const slugify_1 = __importDefault(require("slugify"));
const models_1 = require("../models");
const checkUniqueData = (slug, modelName) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield models_1.UserModel.findOne({ lessonSlug: slug });
    if (!result) {
        return true;
    }
    else {
        return false;
    }
});
exports.generateSlug = (name, model) => __awaiter(void 0, void 0, void 0, function* () {
    let url = slugify_1.default(name.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
    let isUnique;
    isUnique = false;
    let i = 1;
    let tempUrl = url;
    while (!isUnique) {
        const result = yield checkUniqueData(tempUrl, model);
        isUnique = result;
        if (!isUnique) {
            tempUrl = `${url}-${i}`;
            i++;
        }
    }
    return tempUrl;
});
