import * as bcrypt from "bcrypt";

const encryptPassword = (password: string): string => {
	return bcrypt.hashSync(password, 10);
}


const comparePassword = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash);
}

export {
	encryptPassword,
	comparePassword
}