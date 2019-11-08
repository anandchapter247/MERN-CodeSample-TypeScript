import path from 'path';

export const AppURL: string = "";

export const ENVEnum: any = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  };

export const FrontImageUploadPath: string = path.join('/', 'assets', 'frontend_images');
  
export const Environment: string = process.env.NODE_ENV || ENVEnum.DEVELOPMENT;
export const webURL: string =
Environment == ENVEnum.DEVELOPMENT
    ? 'http://192.168.2.138:3000'
    : 'http://dev.drpolly.com';
