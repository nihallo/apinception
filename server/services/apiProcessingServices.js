import { calculateExpression } from "./calculationServices.js";
import { level1Processing } from "./level1ProcessingService.js";
import { responseObject } from "./responseObjectServices.js";

export const apiProcessing = async (data, processingSteps) =>{
    
    //loop through each steps
    loopStep: 
    for( var stepObj of processingSteps){
        console.log("Step: ", stepObj.stepNumber, "Step Name: ", stepObj.stepName, "loopStep start");
    // within each step
        loopData:
        for ( var currentDataRecord of data ){


            //##--check level, 1-5
            //im at data level 1
            if( stepObj.dataLevel==1){//process level 1 data, becuase current processing step is also for level 1

                //##-- check pre-condition before processing for more efficent loop processing, only run for selected records in a list.
                const preConditionResponseObject = calculateExpression(stepObj.preCondition, currentDataRecord);
                if ( preConditionResponseObject.success){

                    const processResult = await level1Processing(stepObj, currentDataRecord);
                    
                    if (processResult.success){
                        currentDataRecord = processResult.data;
                       //no return, process dont stop, continue to next loop.
                    } else {
                        //##--log exception
                        console.log("level1Processing failed");
                        console.log("Step number: ",stepObj.stepNumber,"Data level: ",stepObj.dataLevel, stepObj.processingType, "failed message",processResult.message);
                        return responseObject(false,"API_PROCESSING_ERROR",processResult.message,data);
                        break loopData;
                    }

                }else { // !(preConditionResponseObject.success)
                    // Do nothing becuase pre-condition for this step is not true
                    console.log(stepObj.stepNumber, stepObj.dataLevel, stepObj.processingType, "pre-condition not met, skip this step");
                }

            }else{  // !(stepObj.dataLevel==1)
                //do nothing, because we are at level 1 but the current processing step is not for level 1
                console.log("Step Number: ",stepObj.stepNumber, "data level: ", stepObj.dataLevel, stepObj.processingType, "data level 1 but step is not for data level.");
            }
        }//end of dtat.forEach
    }// end of processingSteps.forEach 
}