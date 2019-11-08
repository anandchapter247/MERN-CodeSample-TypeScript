import { Request, Response } from 'express';
import { cmsModel } from '../models';
import { Document } from 'mongoose';
import path from 'path';
import { FrontImageUploadPath } from '../config';

/**
|--------------------------------------------------
| Add Home Page
|--------------------------------------------------
*/

const addHomePage = async (): Promise<any> => {
  try {
    if (await cmsModel.findOne({ "name": "homePage" })) {
      return console.log("Home Page Already added");
    }
    const data: any = {
      "name": "homePage",
      "mainSection": {
        title: "Top Organizations Understand the value of Employee Training",
        content: "Dr. Polly provides every employee the perfect training experience to make your team smarter, happier, and more productive.",
        buttonText: "Learn More",
        image: "/assets/frontend_images/bannerhome.svg"
      },

      "howItWorks": {
        title: "How It Works",
        section: [{
          heading: "01",
          // image: String,
          title: "Build Your Profile",
          content: "Tell Dr Polly some basic information about your skills, experience, and learning goals.",
        },
        {
          heading: "02",
          // image: String,
          title: "Take Customized Courses",
          content: "As you go through courses, Dr Polly learns about your strengths and tailors the course content to you.",
        },
        {
          heading: "03",
          // image: String,
          title: "Save Time",
          content: "By focusing the material on your needs, Dr Polly makes your training courses shorter and more impactful.",
        }
        ],
        buttonText: "Learn More"
      },

      "ourStory": {
        heading: "Our Story",
        title: "Curabitur eu sem metus. Quisque finibus nisl ut fringilla aliquam.",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        videoLink: "https://www.youtube.com/watch?v=sBws8MSXN7A"
      },

      "why": {
        heading: "Why Dr Polly?",
        section:
          [{
            title: "Smarter Employees, For Less Time And Money",
            image: "/assets/frontend_images/why1.svg",
            // image: "",
            content:
              [{
                text: "Course content is customized to best educate each student.",
              },
              {
                text: "The most impactful and relevant material is highlighted."
              },
              {
                text: "Dynamically adapts teaching style to individual strengths."
              },
              {
                text: "Learns from students and improves with every lesson taken!."
              }
              ]
          },
          {
            title: "A System That Works With You, And For you",
            image: "/assets/frontend_images/why2.svg",
            // image: "",
            content:
              [{
                text: "Define your teams’ curriculum by choosing which courses they see.",
              },
              {
                text: "Create groups to show completely different content."
              },
              {
                text: "Use the Dr. Polly machine learning algorithms with your existing internal trainings too. We can integrate your internal training courses, or help you build completely customized new ones!"
              },
              {
                text: "Monitor training progress with a powerful team management portal."
              },
              {
                text: "Pricing that fits the needs of any size team."
              }
              ]
          },
          ]
      }
    }
    const homePage = new cmsModel(data)
    const result = await homePage.save()
    return console.log("Home page Created Successfully!", result);
  } catch (error) {
    console.log(error);
  }
}


/**
|--------------------------------------------------
| View Home Page
|--------------------------------------------------
*/

const viewHomePage = async (req: Request, res: Response): Promise<any> => {
  try {
    const result: Document | any = await cmsModel.findOne({
      name: "homePage"
    })
    if (result == null) {
      return res.status(404).json({
        responseCode: 404,
        message: "Data not found",
        success: false
      })
    }
    return res.status(200).json({
      responseCode: 200,
      data: result,
      success: false
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure."
    })
  }
}

/**
|--------------------------------------------------
| Update Setting
|--------------------------------------------------
*/

const updateHomePage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const files: any = req.files
    //console.log("JSON.parse(body.whySection)", JSON.parse(body.whySection));
    // return
    let data = {
      mainSection: {
        image: body.mainSectionImage,
        content: body.mainSectionContent,
        title: body.mainSectionTitle,
        buttonText: body.mainSectionButtonText
      },
      howItWorks: {
        buttonText: body.howItWorksButtonText,
        section: JSON.parse(body.howItWorksSection)
      },
      ourStory: {
        title: body.ourStoryTitle,
        content: body.ourStoryContent,
        videoLink: body.ourStoryVideoLink
      },
      why: {
        section: JSON.parse(body.whySection)
      }
    }
    let sectionData = JSON.parse(body.whySection)
    let whyImage = sectionData.map((element: any) => {
      return element
    });
    if (files) {
      if (files.mainSectionImage) {
        const filename = files.mainSectionImage[0].filename;
        data.mainSection.image = path.join(FrontImageUploadPath, filename);
        console.log("data.mainSection.image", data.mainSection.image);
      }
      if (files['whySectionImage[0]']) {
        const filename = files['whySectionImage[0]'][0].filename;
        data.why.section[0].image = path.join(FrontImageUploadPath, filename)
        console.log("data.why.section[0].image", data.why.section[0].image);
      }
      if (files['whySectionImage[1]']) {
        const filename = files['whySectionImage[1]'][0].filename;
        data.why.section[1].image = path.join(FrontImageUploadPath, filename)
        console.log("data.why.section[1].image", data.why.section[1].image);

      }
    }
    //return
    const result: Document = await cmsModel.updateOne(
      {
        name: "homePage"
      },
      {
        $set: data,
      },
      {
        new: true
      })

    //console.log("result", result);

    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: 'Home page updated successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure."
    })
  }
}

/**
|--------------------------------------------------
| Dynamic Home page for frontend
|--------------------------------------------------
*/

const homePageDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const result: Document | any = await cmsModel.findOne({
      name: "homePage"
    })
    if (result == null) {
      return res.status(404).json({
        responseCode: 404,
        message: "Data not found",
        success: false
      })
    }
    return res.status(200).json({
      responseCode: 200,
      data: result,
      success: false
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure."
    })
  }
}


export {
  addHomePage,
  viewHomePage,
  updateHomePage,
  homePageDetails
}