import { evaluate } from "mathjs";
import { responseObject } from "../services/responseObjectServices.js";


export const calculateExpression = (formula, data) => {
    console.log("Check calculate expression, formula: ",formula);
    console.log("data: ", data);
    
    try {
        const result = evaluate(formula,data);
        console.log("calculateExpression in calculateService.js, evaluate sucess: result: ", result);
        return responseObject(true, "SUCCESS","SUCESS", result);
    }catch(error){
        console.log("calculateExpression in calculateService.js, evaluate falied: error: ",error);
        return responseObject(false, "MATH_EVALUATION_ERROR",error.message, error);
    }

} 