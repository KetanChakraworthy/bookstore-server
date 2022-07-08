import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SCERET_KEY = process.env.JWT_SCERET_KEY
export const auth = async (req, res, next) => {
    try {
        const { token } = req.headers.authorization.split('-')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (isCustomAuth && token) {
            decodedData = Jwt.verify(token, JWT_SCERET_KEY);
            req.userId = decodedData?.id;
        } else {
            decodedData = Jwt.decode(token);
            req.userId = decodedData?.sub;
        }
    } catch (error) {
        console.log(error);
    }
    next();
}