import { responseObject } from "./responseObjectServices.js";
import { ProcessingType, AddFieldMethod} from "../constants/constants.js";
import { calculateExpression } from "./calculationServices.js";
import ValidationMessageClass from "../classes/ValidationMessageClass.js";
import {getMasterData} from "./masterDataLookup.js";
import { v4 as uuidv4 } from 'uuid';


export const level1Processing = async (currentStepObject, currentLevelDataRecord ) => {
    //TODO: for input parameters, the currentRecord is the data in the current loop, could be level 1 or level 2, should be common
    // but it will limit the calculation to the data in the current loop
    // should add in fixed parent data at level 1, level 2, level 3.
    
    console.log("---level1Processing starts: ", "currentStepObject.processingType: ",currentStepObject.processingType, "currentStepObject.addFieldMethod: ",currentStepObject.addFieldMethod);

    //?? check processing processingType
    switch(currentStepObject.processingType) {
        case ProcessingType.ADD_FIELD:            
            //?? check addFieldMethod: CALCULATE, QUERY_DB.
            switch(currentStepObject.addFieldMethod){
                case AddFieldMethod.CALCULATE:
                    //##get field value via calculation
                    const calculationResultObject = calculateExpression(currentStepObject.formula, currentLevelDataRecord);
                    if(calculationResultObject.success){
                        currentLevelDataRecord[currentStepObject.fieldName]= calculationResultObject.data;
                        return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentLevelDataRecord);
                    } else{
                        console.log("calculation error: ", calculationResultObject.message);
                        return responseObject(false, calculationResultObject.code, calculationResultObject.message);
                    };
                    break;
                case AddFieldMethod.QUERY_DB:
                    //## get field value via database query

                    const dbResultObject = await getMasterData(currentStepObject.tableName, currentStepObject.columnNames, currentStepObject.whereClause, currentLevelDataRecord);
                    if(dbResultObject.success && dbResultObject.data.length !=0){
                        //## add the field
                        //TODO, something columnName is defined with wrong column name the assignment will fail. the column name need to be controlled from the UI.
                        currentLevelDataRecord[currentStepObject.fieldName]=dbResultObject.data[0][currentStepObject.columnNames.split(",")[0]];
                        //
                        //TODO Log error
                        console.log("level1Processing in level1ProcessingService.js finished success, data: ",dbResultObject.data);
                        return responseObject(true, "ADD_FIELD BY QUERY_DB SUCCESS", "got data from db and updated to current currentLevelDataRecord.",currentLevelDataRecord);
                    } else if (dbResultObject.success && dbResultObject.data.length ==0){
                        //query success but empty result
                        console.log("level1Processing in level1ProcessingService.js: faileed to get data from getMasterData: error: ", dbResultObject.message, dbResultObject.data);
                        return responseObject(false, "ADD_FIELD_BY_QUERY_DB_FAILED", "No matching result based on query. empty data.",
                                                    "table: ",currentStepObject.tableName,
                                                    "column names: ",currentStepObject.columnNames,
                                                    "where clause: ", currentStepObject.whereClause
                        );
                        break;
                    }else{
                        //query db error
                        console.log("level1Processing in level1ProcessingService.js: faileed to get data from getMasterData: error: ", dbResultObject.message, dbResultObject.data);
                        return responseObject(false, "ADD_FIELD_BY_QUERY_DB_FAILED", "failed to get data from getMasterData.",dbResultObject.data);
                        break;
                    }
                    
                case AddFieldMethod.SEQUENCE:
                    const sequenceID = uuidv4();
                    currentLevelDataRecord[currentStepObject.fieldName]= sequenceID;
                    return responseObject(true, "SUCCESS", "SEQUENCE ID ADDED.",currentLevelDataRecord);
                default:
                // wrong input, for add field, so far two methods only, calculate and query_db
                    console.log("wrong input, for add field, so far two methods only, calculate and query_db: ");
                    console.log("currentStepObject.processingType", currentStepObject.processingType);
                    console.log("currentStepObject.addFieldMethod", currentStepObject.addFieldMethod);
                    // to handle exception
                    return responseObject(false, "ADD_FIELD_BY_QUERY_DB_FAILED", "wrong processing type, for add field, so far two methods only, calculate and query_db. but got: ",currentStepObject.addFieldMethod, dbResultObject.data);
            }
        break;
        //##-- assign value for field and add to json data
        case ProcessingType.ADD_LIST:
            //##-- to get data from db
            //## step 1: construct the query string
            //## step 2: call database
            switch(currentStepObject.addFieldMethod){
                case AddFieldMethod.QUERY_DB:
                    //## step 1: construct the query string
                    //const dbResult = await getMasterData(currentStepObject.tableName, currentStepObject.columnNames, currentStepObject.whereClause);
                    //## COPIED FROM ADD FIELD BY DB
                    //TODO, CHECK REFACTOR
                    const dbResultObject = await getMasterData(currentStepObject.tableName, currentStepObject.columnNames, currentStepObject.whereClause, currentLevelDataRecord);
                    if(dbResultObject.success && dbResultObject.data.length !=0){
                        //## add the field
                        //TODO, something columnName is defined with wrong column name the assignment will fail. the column name need to be controlled from the UI.
                        if(currentStepObject.dataLevel==1){
                            // for add list to level 1, the name of the list if level 2
                            currentLevelDataRecord[currentStepObject.levelTwoList_InTheVan]=dbResultObject.data;
                        }else if(currentStepObject.dataLevel==2){
                            // for add list to level 2, the name of the list if level 3
                            currentLevelDataRecord[currentStepObject.levelThreeList_InTheHotel]=dbResultObject.data;
                        }
                        //
                        //TODO Log error
                        console.log("level1Processing in level1ProcessingService.js finished success, data: ",dbResultObject.data);
                        return responseObject(true, "ADD_FIELD BY QUERY_DB SUCCESS", "got data from db and updated to current currentLevelDataRecord.",currentLevelDataRecord);
                    } else if (dbResultObject.success && dbResultObject.data.length ==0){
                        //query success but empty result
                        console.log("level1Processing in level1ProcessingService.js: faileed to get data from getMasterData: error: ", dbResultObject.message, dbResultObject.data);
                        return responseObject(false, "ADD_FIELD_BY_QUERY_DB_FAILED", "No matching result based on query. empty data.",
                                                    "table: ",currentStepObject.tableName,
                                                    "column names: ",currentStepObject.columnNames,
                                                    "where clause: ", currentStepObject.whereClause
                                                );
                    }else{
                        //query db error
                        console.log("level1Processing in level1ProcessingService.js: faileed to get data from getMasterData: error: ", dbResultObject.message, dbResultObject.data);
                        return responseObject(false, "ADD_FIELD_BY_QUERY_DB_FAILED", "failed to get data from getMasterData.",dbResultObject.data);
                    }
                    //## END OF COPIED FROM ADD FIELD BY DB
                    break;
                    
                default:
                    break;
                }
            //##-- form Json object
            //##-- attach to the right place

            return responseObject(false, "NOT DONE","ADD_LIST NOT DONE");
            break;
        case ProcessingType.CALCULATION:
            return responseObject(false, "NOT DONE","CALCULATION NOT DONE");
            break;
        case ProcessingType.VALIDATION:
            const validationResult = calculateExpression(currentStepObject.formula, currentLevelDataRecord);
            if(validationResult.success){
                var validationMessage = new ValidationMessageClass(currentStepObject.stepName,currentStepObject.errorType, currentStepObject.errorMessage);

                if(currentLevelDataRecord.VALIDATION){//alreay have value in the list, append to the list
                    currentLevelDataRecord.VALIDATION.push(validationMessage.getJosn());
                }else{//no value in the list, create a list
                    currentLevelDataRecord.VALIDATION =[validationMessage.getJosn()];
                }

                return responseObject(true, "SUCCESS", "LEVEL 1 PROCESS SUCCESS",currentLevelDataRecord);
            } else {
                return responseObject(false, validationResult.code, validationResult.message);
            };
            break;
        default:
            return responseObject(false, "WRONG_PROCESSING_TYPE", "No matching processing type");
        }
}