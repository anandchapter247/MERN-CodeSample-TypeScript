import { FaqModel } from "../models";
import { Request, Response } from "express";
import { Document } from "mongoose";

const addFaq = async (req: Request, res: Response): Promise<any> => {
   try {
      const { body } = req;
      const { question, answer, order } = body;
      const faqData: any = {
         question: question,
         answer: answer,
         order: order
      }
      const faqResult: Document = new FaqModel(faqData)
      await faqResult.save();
      return res.status(200).json({
        responseCode:200,
        message: "FAQ added successfully.",
        success: true
      })
   } catch (error) {
      res.status(500).json({
         message: error.message ? error.message : "Unexpected error occure.",
         success: false
      });
   }
}

const getFaqs = async (req: Request, res: Response): Promise<any> => {
   try {
      const { query } = req;
      const { limit, page, search, status, faqId, sort } = query;
      const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 10);
      const limitNumber: number = parseInt(limit) || 10;

      let condition: any = {
         $and: []
      };
      if (faqId) {
         condition.$and.push({
            isDeleted: false,
            _id: faqId
         });
      } else {
         condition.$and.push({
            isDeleted: false,
         });
      }
      if (search) {
         condition.$and.push({
            $or: [
               {
                  question: {
                     $regex: new RegExp(search.trim(), "i")
                  }
               },
               {
                  answer: {
                     $regex: new RegExp(search.trim(), "i")
                  }
               }
            ]
         });
      }
      // check for sort option
      let sortOption = {};
      switch (sort) {
         case "orderasc":
            sortOption = {
               order: 1
            };
            break;
         case "orderdesc":
            sortOption = {
               order: -1
            };
            break;
         default:
            sortOption = {
               order: 1
            };
            break;
      }
      if (typeof status !== "undefined") {
         condition.$and.push({
            status: status == "1" ? true : false
         });
      }
      const faqData: Document[] = await FaqModel.find(condition).limit(limitNumber)
         .skip(pageNumber).sort(sortOption);

      const faqDataCount: Document | number = await FaqModel.countDocuments(condition)
      return res.status(200).json({
         data: faqData,
         totalFaq: faqDataCount,
         success: true
      })
   } catch (error) {
      res.status(500).json({
         message: error.message ? error.message : "Unexpected error occure.",
         success: false
      });
   }
}
/* 
/* 
*/
const updateFaq = async (req: Request, res: Response): Promise<any> => {
   try {
      const { body } = req;
      await FaqModel.findByIdAndUpdate(body.faqId, {
         $set: {...body,updatedAt:Date.now()}
      })
      return res.status(200).json({
         message: body.isDeleted === true ? "FAQ deleted successfully." : "FAQ details updated successfully.",
         success: true
      })
   } catch (error) {
      res.status(500).json({
         message: error.message ? error.message : "Unexpected error occure.",
         success: false
      });
   }
};
const updateFaqOrder = async (req: Request, res: Response): Promise<any> => {
   try {
      const { body } = req;
      const { orderData } = body;
      for (let x = 0; x < orderData.length; x++) {
         if (parseFloat(orderData[x].order) <= 0) {
            return res.status(400).json({
               message: "Order By no. is Required.",
               success: false
            })
         }
         
         let result: Document = await FaqModel.updateOne(
            {
               _id: orderData[x].id
            },
            {
               $set: {
                  order: parseFloat(orderData[x].order),
                  updatedAt:Date.now()
               }
            }
         );
      }
      return res.status(200).json({
         message: "FAQ details updated successfully."
      });
   } catch (error) {
      res.status(500).json({
         message: error.message ? error.message : "Unexpected error occure.",
         success: false
      });
   }
}

// To update status of faq
const updateFaqStatus = async (
   req: Request,
   res: Response,
 ): Promise<any> => {
   try {
     const { body } = req;
     const result: Document = await FaqModel.update(
       {
         _id: body.id,
       },
       {
         $set: {
           isActive: body.isActive,
         },
       },
     );
 
     let message: string =
       body.isActive === true
         ? 'Faq activated successfully'
         : 'Faq deactivated successfully';
     return res.status(200).json({
       responseCode: 200,
       data: result,
       message: message,
       success: true,
     });
   } catch (error) {
     console.log(error);
     res.status(500).json({
       message: error.message ? error.message : 'Unexpected error occure.',
       success: false,
     });
   }
 };

export {
   addFaq,
   getFaqs,
   updateFaq,
   updateFaqOrder,
   updateFaqStatus
}