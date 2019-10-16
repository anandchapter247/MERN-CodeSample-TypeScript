import { Schema, model } from 'mongoose';

const cmsSchema = new Schema({
  name: {
    type: String,
    default: "homePage"
  },
  mainSection:
  {
    type: new Schema({
      image: String,
      title: String,
      content: String,
      buttonText: String
    })
  },
  howItWorks: {
    type: new Schema({
      title: String,
      section: {
        type: [new Schema({
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
    type: new Schema({
      heading: String,
      title: String,
      content: String,
      videoLink: String
    })
  },
  why: {
    type: new Schema({
      heading: String,
      section: {
        type: [new Schema({
          title: String,
          image: String,
          content: {
            type: [new Schema({
              text: String
            })]
          }
        })]
      }
    })
  }
})

export const cmsModel = model('cms', cmsSchema);
