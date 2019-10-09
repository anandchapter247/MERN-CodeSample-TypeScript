import { Request, Response } from "express";
import { Types } from "mongoose";
import moment from "moment";
import { generateExcelReport } from "../common";
import { UserModel } from "../models";

/* -------------------------------- Export report --------------------------------- */
const exportReport = async (req: Request, res: Response): Promise<any> => {
    const styles = {
      headerDark: {
        fill: {
          fgColor: {
            // rgb: '000000'
          },
        },
        font: {
          color: {
            rgb: 'FFFFFFFF',
            /* rgb: '00000' */
          },
          sz: 12,
          bold: true,
          fontfamily: 'Times New Roman',
        },
      },
    };
    //Here you specify the export structure
    const specification = {
      courseCustomId: {
        // <- the key should match the actual data key
        displayName: 'Course Id', // <- Here you specify the column header
        headerStyle: styles.headerDark, // <- Header style
        width: 70, // <- width in pixels
      },
      courseName: {
        displayName: 'Course Name',
        headerStyle: styles.headerDark,
        width: 70, // <- width in chars (when the number is passed as string)
      },
      studentCustomId: {
        displayName: 'Student ID',
        headerStyle: styles.headerDark,
        width: 70,
      },
      firstName: {
        displayName: 'Student First Name',
        headerStyle: styles.headerDark,
        width: 220,
      },
      lastName: {
        displayName: 'Student Last Name',
        headerStyle: styles.headerDark,
        width: 220,
      },
      enrolledDate: {
        displayName: 'Enrolled Date',
        headerStyle: styles.headerDark,
        width: 120,
      },
      startDate: {
        displayName: 'Started Date',
        headerStyle: styles.headerDark,
        width: 220,
      },
      completedPercentage: {
        displayName: 'Percent Complete',
        headerStyle: styles.headerDark,
        width: 220,
      },
      complete: {
        displayName: 'Completed',
        headerStyle: styles.headerDark,
        width: 120,
      },
      completionDate: {
        displayName: 'Completion Date/Time',
        headerStyle: styles.headerDark,
        width: 70,
      },
      totalScore: {
        displayName: 'Final Course Test Score',
        headerStyle: styles.headerDark,
        width: 180,
      },
    };
    const { currentUser, query } = req;
    const searchValue: string = query.searchValue || '';
    const courseName: string = query.courseName || '';
    let condition: object = {};
  
    if (searchValue) {
      condition = {
        $or: [
          {
            firstName: {
              $regex: new RegExp(searchValue.trim(), 'i'),
            },
          },
          {
            lastName: {
              $regex: new RegExp(searchValue.trim(), 'i'),
            },
          },
        ],
      };
    }
    if (courseName) {
      condition = {
        ...condition,
        'courseData.courseName': {
          $regex: new RegExp(courseName.trim(), 'i'),
        },
      };
    }

    const result: Document[] | any = await UserModel.aggregate([
      {
        $unwind: {
          path: '$courseId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...condition,
          createdBy: currentUser ? Types.ObjectId(currentUser.id) : null,
          isDeleted: false,
          userRole: 'Student',
          // 'courseData.status': 'active',
        },
      },
    ]);
    const dataset: any[] = [];
    for (let i = 0; i < result.length; i++) {
      const response: any = result[i];
      let tempObj: any;
      const { studentCustomId, firstName, lastName, courseId } = response;
      const {
        status,
        enrolledDate,
        startDate,
        completionDate,
        completedPercentage,
        totalScore,
      } = courseId;
      tempObj = {
        courseCustomId:
          courseId && courseId.courseId ? courseId.courseId.courseCustomId : '-',
        courseName:
          courseId && courseId.courseId ? courseId.courseId.courseName : '-',
        studentCustomId,
        firstName,
        lastName,
        enrolledDate: enrolledDate ? moment(enrolledDate).format('LL') : '-',
        startDate: startDate ? moment(startDate).format('LL') : '-',
        completedPercentage: completedPercentage || 0,
        complete: status === 'Completed' ? 'Yes' : 'No',
        completionDate: completionDate
          ? moment(completionDate).format('LL')
          : '-',
        totalScore: totalScore || 0,
      };
      dataset.push(tempObj);
    }
    const report = generateExcelReport(specification, dataset)
    // You can then return this straight
    // res.attachment(moment().format('YYYY_MM_DD') + '_student_report.xlsx'); // This is sails.js specific (in general you need to set headers)
    return res.status(200).send(report);
  };

export {
    exportReport
}