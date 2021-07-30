import jwt from "jsonwebtoken";
import {responseObject} from "../services/responseObjectServices.js";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      try{
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
      }catch(error){
        console.log("i am here",error);
        res.status(401).json(responseObject(false,"AUTH_ERROR",error.message));
      }

    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
