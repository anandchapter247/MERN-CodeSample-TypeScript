import { Request, Response } from "express";
import pool from "../config/db";
import { IUser } from "../models";
const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { body, query } = req;
        const { email } = query;
        const result = await pool.query('select * from users where email = ?', [email]);
        const user: IUser[] = result[0] as IUser[];
        if (!user.length) {
            return res.status(400).send({
                message: "User not found."
            });
        }
        res.status(200).send({
            users: user[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            users: []
        });
    }
}

export {
    login
}