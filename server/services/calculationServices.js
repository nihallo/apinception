import {evaluate, re} from "mathjs";

export const calculateExpression = (formula, data, fieldType) => {

    if (fieldType =='DATE'){
        
    }

    console.log("Inside calculateExpression: ",formula);
    console.log("formula",formula);
    console.log("data", data);
    const result = evaluate(formula,data);
    console.log("result :", result);
    return result;
} 