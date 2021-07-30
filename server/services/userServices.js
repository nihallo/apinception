import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {responseObject} from "../services/responseObjectServices.js";

import UserModal from "../models/user.js";

const secret = 'test';

export const signup = async (email, password, firstName, lastName) => {

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return  responseObject(false,"SIGN_UP_ERROR_USER_EXISTS","User already exists" );

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    return { success:true, object: {result, token} };
  } catch (error) {
    console.log(error);
    return responseObject(false,"SIGN_UP_ERROR_CATCH", "Catch expection: Something went wrong");
  }
};

export const signin = async (email, password) => {
  
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (!oldUser) return responseObject(false,"SIGN_IN_ERROR_USER_NOT_EXIST","User does not exist.");
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return responseObject(false,"SIGN_IN_ERROR_INVALID_CREDENTIALS","Invalid credentials."); 

      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      return { success:true, object:{result: oldUser, token }};
    } catch (error) {
        console.log(error);
        return responseObject(false,"SIGN_IN_ERROR_CATCH","Catch expection: Something went wrong.");
    }
  };