"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_excel_export_1 = __importDefault(require("node-excel-export"));
exports.generateExcelReport = (specification, dataset) => {
    const report = node_excel_export_1.default.buildExport([
        // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
            name: 'Report',
            specification: specification,
            data: dataset,
        },
    ]);
    return report;
};
