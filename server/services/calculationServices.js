import {evaluate, re} from "mathjs";
import { errorObject } from "./errorServices.js";

export const calculateExpression = (formula, data) => {
    let result;
    try{
         result = evaluate(formula,data);
    }catch(error){
        console.log(error);
    }
    console.log("will it come to this line?")
    return result;
} 