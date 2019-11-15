import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const faqSchema: Mongoose.Schema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    order: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export const FaqModel = Mongoose.model("faq", faqSchema);