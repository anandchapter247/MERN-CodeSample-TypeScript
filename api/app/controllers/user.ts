import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    res.status(200).send({
      users: []
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      users: []
    });
  }
};

export { getUsers };
