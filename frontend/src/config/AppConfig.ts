export const ENVEnum: any = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const Environment: string = process.env.NODE_ENV || ENVEnum.DEVELOPMENT;
export const API_ENDPOINT: string =
  Environment === ENVEnum.DEVELOPMENT
    ? 'http://192.168.2.114:8000/api/v1'
    : 'http://api.drpolly.com/v1';
