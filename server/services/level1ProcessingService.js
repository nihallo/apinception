import { responseObject } from "./responseObjectServices.js";
import { ProcessingType, AddFieldMethod} from "../constants/constants.js";
import { calculateExpression } from "./calculationServices.js";
import ValidationMessageClass from "../classes/ValidationMessageClass.js";



export const level1Processing = async (stepObj, currentDataRecord, data ) => {

    //process this step when pre-condition is true
    switch(stepObj.processingType) {
        case ProcessingType.ADD_FIELD:
            if (stepObj.addFieldMethod == AddFieldMethod.CALCULATE){
                //##get field value via calculation
                const calculationResultObject = calculateExpression(stepObj.formula, currentDataRecord);
                if(calculationResultObject.success){
                    currentDataRecord[stepObj.fieldName]= calculationResultObject.data;
                    return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentDataRecord);
                } else{
                    return responseObject(false, calculationResultObject.code, calculationResultObject.message);
                }
            }else if(stepObj.addFieldMethod == AddFieldMethod.QUERY_DB){
                //## get field value via database query


            } else{
                // wrong input, for add field, so far two methods only, calculate and query_db
                
                // to handle exception
            }
            //##-- assign value for field and add to json data


        case ProcessingType.ADD_LIST:
            //##-- to get data from db

            //##-- form Json object
            //##-- attach to the right place


            return responseObject(false, "NOT DONE","ADD_LIST NOT DONE");
            break;
        case ProcessingType.CALCULATION:
            return responseObject(false, "NOT DONE","CALCULATION NOT DONE");
            break;
        case ProcessingType.VALIDATION:
            const validationResult = calculateExpression(stepObj.formula, currentDataRecord);
            if(validationResult.success){
                var validationMessage = new ValidationMessageClass(stepObj.stepName,stepObj.errorType, stepObj.errorMessage);

                if(currentDataRecord.VALIDATION){//alreay have value in the list, append to the list
                    currentDataRecord.VALIDATION.push(validationMessage.getJosn());
                }else{//no value in the list, create a list
                    currentDataRecord.VALIDATION =[validationMessage.getJosn()];
                }

                return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentDataRecord);
            } else {
                return responseObject(false, validationResult.code, validationResult.message);
            };
            break;
        default:
            return responseObject(false, "WRONG_PROCESSING_TYPE", "No matching processing type");
        }
}