import { createAction } from 'redux-actions';

export enum ReportActionTypes {
  EXPORT_STDUENT_REPORT_REQUEST = 'Request for export student reports',
}

export const exportReportRequest = createAction(
  ReportActionTypes.EXPORT_STDUENT_REPORT_REQUEST,
);