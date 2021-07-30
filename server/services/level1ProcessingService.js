import { responseObject } from "./responseObjectServices.js";

export const level1Processing = (stepObj, currentDataRecord, data ) => {

    //process this step when pre-condition is true
    switch(stepObj.processingType) {
        case ProcessingType.ADD_FIELD:
            if (stepObj.addFieldMethod == AddFieldMethod.CALCULATE){
                //##get field value via calculation
                currentDataRecord[stepObj.fieldName]= calculateExpression(stepObj.formula, currentDataRecord);
                
            }else if(stepObj.addFieldMethod == AddFieldMethod.QUERY_DB){
                //get field value via database query

            } else{
                // wrong input, for add field, so far two methods only, calculate and query_db
                
                // to handle exception
            }
            //##-- assign value for field and add to json data


        case ProcessingType.ADD_LIST:
            console.log();
            break;
        case ProcessingType.CALCULATION:
            console.log();
            break;
        case ProcessingType.VALIDATION:
            const validationResult = calculateExpression(stepObj.formula, currentDataRecord);

            currentDataRecord[VALIDATION]=[{stepName:stepObj.stepName,result:validationResult}];
            console.log();
            break;
        default:
        console.log();
    }
    console.log(stepObj.stepNumber, stepObj.dataLevel, stepObj.processingType, "data after:",data)
}