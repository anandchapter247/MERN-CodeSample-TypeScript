import excel from 'node-excel-export';

export const generateExcelReport = (specification:any, dataset:any[]) => {
    const report = excel.buildExport([
        // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
        name: 'Report',
        specification: specification, // <- Report specification
        data: dataset, // <-- Report data
        },
    ])
    return report;
}
