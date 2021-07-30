import {ProcessingType, AddFieldMethod} from "../constants/constants.js";
import { calculateExpression } from "./calculationServices.js";

export const processingApiRequest = async (data, processingSteps) =>{
    
    //loop through each steps
    processingSteps.forEach(stepObj=>{
    // within each step
        data.forEach(currentDataRecord =>{
            //##--check level, 1-5
            //im at data level 1
            if( stepObj.dataLevel==1){
                //process level 1 data, becuase current processing step is also for level 1

                //##-- check pre-condition before processing for more efficent loop processing, only run for selected records in a list.
                const isPreConditionTrue = calculateExpression(stepObj.preCondition, currentDataRecord);
                if ( isPreConditionTrue){ 
                    //process this step when pre-condition is true
                
                    //##--check processing type

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

                            currentDataRecord.VALIDATION=[{stepName:stepObj.stepName,result:validationResult}];
                            console.log();
                            break;
                        default:
                        console.log();
                    }
                    console.log(stepObj.stepNumber, stepObj.dataLevel, stepObj.processingType, "data after:",data)
                }else{
                    // Do nothing becuase pre-condition for this step is not true
                    console.log(stepObj.stepNumber, stepObj.dataLevel, stepObj.processingType, "pre-condition wrong");
                }
            }else{
                // do nothing, because we are at level 1 but the current processing step is not for level 1
                console.log(stepObj.stepNumber, stepObj.dataLevel, stepObj.processingType, "data level 1 but step is not for data level.");

            }
        })
    })// end of processingSteps.forEach 
    return {data};
}