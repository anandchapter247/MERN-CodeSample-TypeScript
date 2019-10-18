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
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test.chapter247@gmail.com',
        pass: 'chapter247@@',
    },
});
class Email {
    constructor(req) {
        this.body = '';
        this.subject = '';
        this.to = [];
        this.cc = '';
        const host = req && req.headers && req.headers.referer
            ? req.headers.referer.split('/')
            : [];
        this.host = [host[0] || '', host[1] || '', host[2] || ''].join('/');
        this.webURL = '';
        this.adminURL = '';
    }
    setTemplate(templateName, replaceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!templateName) {
            //   throw new Error('Please provide template name');
            // }
            let content = templateName;
            // To replace variables dynamically
            for (const key in replaceObject) {
                if (replaceObject.hasOwnProperty(key)) {
                    const val = replaceObject[key];
                    content = content.replace(new RegExp(`{${key}}`, 'g'), val);
                }
            }
            this.body = content;
            return content;
        });
    }
    setSubject(subject) {
        this.subject = subject;
    }
    setBody(body) {
        this.body = body;
    }
    setCC(cc) {
        this.cc = cc;
    }
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error('Please provide email.');
            }
            const mailOption = {
                from: 'Dr. Polly <test.chapter247@gmail.com>',
                to: email,
                cc: this.cc,
                subject: this.subject,
                html: this.body,
            };
            let resp = transporter.sendMail(mailOption);
            return resp;
        });
    }
}
exports.Email = Email;
