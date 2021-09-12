import { responseObject } from "./responseObjectServices.js";
import { ProcessingType, AddFieldMethod} from "../constants/constants.js";
import { calculateExpression } from "./calculationServices.js";
import ValidationMessageClass from "../classes/ValidationMessageClass.js";
import {getMasterData} from "./masterDataLookup.js";


export const level1Processing = async (currentStepObject, currentLevelOneRecord ) => {

    console.log("---level1Processing starts: ", "currentStepObject.processingType: ",currentStepObject.processingType, "currentStepObject.addFieldMethod: ",currentStepObject.addFieldMethod);

    //?? check processing processingType
    switch(currentStepObject.processingType) {
        case ProcessingType.ADD_FIELD:            
            //?? check addFieldMethod: CALCULATE, QUERY_DB.
            switch(currentStepObject.addFieldMethod){
                case AddFieldMethod.CALCULATE:
                    
                    //##get field value via calculation
                    const calculationResultObject = calculateExpression(currentStepObject.formula, currentLevelOneRecord);
                    if(calculationResultObject.success){
                        currentLevelOneRecord[currentStepObject.fieldName]= calculationResultObject.data;
                        return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentLevelOneRecord);
                    } else{
                        console.log("calculation error: ", calculationResultObject.message);
                        return responseObject(false, calculationResultObject.code, calculationResultObject.message);
                    }
                
                case AddFieldMethod.QUERY_DB:
                    //## get field value via database query

                    //here here
                    console.log("Ready to go to getMasterData: ");
                    console.log("currentStepObject.tableName", currentStepObject.tableName);
                    console.log("currentStepObject.columnNames", currentStepObject.columnNames);
                    console.log("currentStepObject.whereClause", currentStepObject.whereClause);

                    const dbResultObject = await getMasterData(currentStepObject.tableName, currentStepObject.columnNames, currentStepObject.whereClause);
                    if(dbResultObject.success){
                        console.log("Coming out of getMasterData: ", dbResultObject.data);
                        //## add the field
                        currentLevelOneRecord[currentStepObject.fieldName]=dbResultObject.data[0][currentStepObject.columnNames.split(",")[0]];
                    } else{
                        console.log("level1Processing in level1ProcessingService.js: faileed to get data from getMasterData: error: ", dbResultObject.message, dbResultObject.data);
                    }

                default:
                // wrong input, for add field, so far two methods only, calculate and query_db
                    console.log("wrong input, for add field, so far two methods only, calculate and query_db: ");
                    console.log("currentStepObject.processingType", currentStepObject.processingType);
                    console.log("currentStepObject.addFieldMethod", currentStepObject.addFieldMethod);
                    // to handle exception

            }
        
        //##-- assign value for field and add to json data
        case ProcessingType.ADD_LIST:
            //##-- to get data from db
                //## step 1: construct the query string
                //## step 2: call database

                //## step 1: construct the query string
                //const dbResult = await getMasterData(currentStepObject.tableName, currentStepObject.columnNames, currentStepObject.whereClause);


            //##-- form Json object
            //##-- attach to the right place


            return responseObject(false, "NOT DONE","ADD_LIST NOT DONE");
            break;
        case ProcessingType.CALCULATION:
            return responseObject(false, "NOT DONE","CALCULATION NOT DONE");
            break;
        case ProcessingType.VALIDATION:
            const validationResult = calculateExpression(currentStepObject.formula, currentLevelOneRecord);
            if(validationResult.success){
                var validationMessage = new ValidationMessageClass(currentStepObject.stepName,currentStepObject.errorType, currentStepObject.errorMessage);

                if(currentLevelOneRecord.VALIDATION){//alreay have value in the list, append to the list
                    currentLevelOneRecord.VALIDATION.push(validationMessage.getJosn());
                }else{//no value in the list, create a list
                    currentLevelOneRecord.VALIDATION =[validationMessage.getJosn()];
                }

                return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentLevelOneRecord);
            } else {
                return responseObject(false, validationResult.code, validationResult.message);
            };
            break;
        default:
            return responseObject(false, "WRONG_PROCESSING_TYPE", "No matching processing type");
        }
}