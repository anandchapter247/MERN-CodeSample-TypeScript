import { Request, Response } from "express"; 
import pool from "../config/db";
import { IUser } from "../models";
const getUsers = async (req: Request, res: Response): Promise<any> =>{
	try {
		
		const result = await pool.query('select * from users where id = ?', [1]);
		res.status(200).send({
			users: result[0] as IUser[]
		});
	} catch (error) {
		console.log(error);
		res.status(200).send({
			users: []
		});
	}
}

export {
	getUsers
}