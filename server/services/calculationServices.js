import { evaluate } from "mathjs";
import { responseObject } from "../services/responseObjectServices.js";


export const calculateExpression = (formula, data) => {
    console.log(formula);
    
    try {
        const result = evaluate(formula,data);
        return responseObject(true, "SUCCESS","SUCESS", result);
    }catch(error){
        return responseObject(false, "MATH_EVALUATION_ERROR",error.message, error);
    }

} 