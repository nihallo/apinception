
import {responseObject} from "../services/responseObjectServices.js";
import MasterData from "../models/masterData.js";

/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereCluse": "PromotionCode : promoCode ", */

export const getMasterData = async (data, columnNames, tableName, whereCluse) => {

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