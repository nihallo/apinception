import {evaluate, re} from "mathjs";

export const calculateExpression = (formula, data) => {

    const result = evaluate(formula,data);
    return result;
} 