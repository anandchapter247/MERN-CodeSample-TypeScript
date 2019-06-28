import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    res.status(200).send({
      users: []
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      users: []
    });
  }
};

export { login };
