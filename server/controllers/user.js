import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import {signin,signup} from "../services/userServices.js";

const secret = 'test';

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  const { success, object } = await signin(email, password );
  console.log(success,"object: ", object);
  try {
    if (success){
      res.status(200).json({success:true, object });
    } else{
      res.status(500).json({success:false, object });
    }
  } catch (err) {
    res.status(500).json({success:true, object: {error_code:"SIGN_UP_CONTROLLER_EXCEPTION", message: "Catch expection: Something went wrong" } });
  }
};

export const signupController = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
