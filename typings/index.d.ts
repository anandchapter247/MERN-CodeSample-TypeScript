declare namespace Express {
  export interface Request {
    currentUser?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }
}
