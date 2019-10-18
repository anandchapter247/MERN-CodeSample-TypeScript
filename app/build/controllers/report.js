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
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const common_1 = require("../common");
const models_1 = require("../models");
/* -------------------------------- Export report --------------------------------- */
const exportReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            displayName: 'Course Id',
            headerStyle: styles.headerDark,
            width: 70,
        },
        courseName: {
            displayName: 'Course Name',
            headerStyle: styles.headerDark,
            width: 70,
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
    const searchValue = query.searchValue || '';
    const courseName = query.courseName || '';
    let condition = {};
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
        condition = Object.assign(Object.assign({}, condition), { 'courseData.courseName': {
                $regex: new RegExp(courseName.trim(), 'i'),
            } });
    }
    const result = yield models_1.UserModel.aggregate([
        {
            $unwind: {
                path: '$courseId',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $match: Object.assign(Object.assign({}, condition), { createdBy: currentUser ? mongoose_1.Types.ObjectId(currentUser.id) : null, isDeleted: false, userRole: 'Student' }),
        },
    ]);
    const dataset = [];
    for (let i = 0; i < result.length; i++) {
        const response = result[i];
        let tempObj;
        const { studentCustomId, firstName, lastName, courseId } = response;
        const { status, enrolledDate, startDate, completionDate, completedPercentage, totalScore, } = courseId;
        tempObj = {
            courseCustomId: courseId && courseId.courseId ? courseId.courseId.courseCustomId : '-',
            courseName: courseId && courseId.courseId ? courseId.courseId.courseName : '-',
            studentCustomId,
            firstName,
            lastName,
            enrolledDate: enrolledDate ? moment_1.default(enrolledDate).format('LL') : '-',
            startDate: startDate ? moment_1.default(startDate).format('LL') : '-',
            completedPercentage: completedPercentage || 0,
            complete: status === 'Completed' ? 'Yes' : 'No',
            completionDate: completionDate
                ? moment_1.default(completionDate).format('LL')
                : '-',
            totalScore: totalScore || 0,
        };
        dataset.push(tempObj);
    }
    const report = common_1.generateExcelReport(specification, dataset);
    // You can then return this straight
    // res.attachment(moment().format('YYYY_MM_DD') + '_student_report.xlsx'); // This is sails.js specific (in general you need to set headers)
    return res.status(200).send(report);
});
exports.exportReport = exportReport;
