import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {errorObject} from "../services/errorServices.js";


export const verifyTokenGetId = async (token) => {

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }    

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return  errorObject("SIGN_UP_ERROR_USER_EXISTS","User already exists" );

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "3h" } );

    return { success:true, object: {result, token} };
  } catch (error) {
    console.log(error);
    return errorObject("SIGN_UP_ERROR_CATCH","Catch expection: Something went wrong" );
  }
};