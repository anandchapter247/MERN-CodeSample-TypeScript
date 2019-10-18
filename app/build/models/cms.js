"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cmsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "homePage"
    },
    mainSection: {
        type: new mongoose_1.Schema({
            image: String,
            title: String,
            content: String,
            buttonText: String
        })
    },
    howItWorks: {
        type: new mongoose_1.Schema({
            title: String,
            section: {
                type: [new mongoose_1.Schema({
                        heading: String,
                        image: String,
                        title: String,
                        content: String,
                    })]
            },
            buttonText: String
        })
    },
    ourStory: {
        type: new mongoose_1.Schema({
            heading: String,
            title: String,
            content: String,
            videoLink: String
        })
    },
    why: {
        type: new mongoose_1.Schema({
            heading: String,
            section: {
                type: [new mongoose_1.Schema({
                        title: String,
                        image: String,
                        content: {
                            type: [new mongoose_1.Schema({
                                    text: String
                                })]
                        }
                    })]
            }
        })
    }
});
exports.cmsModel = mongoose_1.model('cms', cmsSchema);
