import { evaluate } from "mathjs";
import { responseObject } from "../services/responseObjectServices.js";


export const calculateExpression = (formula, data) => {
    console.log("Check calculate expression, formula: ",formula);
    try {

        //TODO:  formula dont support %....... what else
        //TODO: data can only come from the current level, cannot cross level.
        
        const result = evaluate(formula,data);
        console.log("calculateExpression in calculateService.js, evaluate sucess: result: ", result);
        return responseObject(true, "SUCCESS","SUCESS", result);
    }catch(error){
        console.log("calculateExpression in calculateService.js, evaluate falied: error: ",error);
        return responseObject(false, "MATH_EVALUATION_ERROR",error.message, error);
    }

} 