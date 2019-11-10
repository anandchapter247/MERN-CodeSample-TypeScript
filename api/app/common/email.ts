const nodemailer = require('nodemailer');
import { Document } from 'mongoose';
import { Request } from 'express';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test.chapter247@gmail.com',
    pass: 'chapter247@@',
  },
});

class Email {
  cc: any;
  subject: any;
  to: any;
  host: any;
  body: any;
  webURL: any;
  adminURL: any;
  constructor(req: Request) {
    this.body = '';
    this.subject = '';
    this.to = [];
    this.cc = '';
    const host =
      req && req.headers && req.headers.referer
        ? req.headers.referer.split('/')
        : [];
    this.host = [host[0] || '', host[1] || '', host[2] || ''].join('/');
    this.webURL = '';
    this.adminURL = '';
  }

  async setTemplate(subject: string, content:any, replaceObject: any): Promise<any> {
    // if (!templateName) {
    //   throw new Error('Please provide template name');
    // }
    this.subject = subject;
    // To replace variables dynamically
    for (const key in replaceObject) {
      if (replaceObject.hasOwnProperty(key)) {
        const val = replaceObject[key];
        content = content.replace(new RegExp(`{${key}}`, 'g'), val);
      }
    }
    this.body = content;
    return content;
  }

  setSubject(subject: string) {
    this.subject = subject;
  }
  setBody(body: Document) {
    this.body = body;
  }
  setCC(cc: string) {
    this.cc = cc;
  }
  async sendEmail(email: string): Promise<any> {
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
  }
}

export { Email };
