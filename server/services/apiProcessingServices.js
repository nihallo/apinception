import { calculateExpression } from "./calculationServices.js";
import { level1Processing } from "./level1ProcessingService.js";
import { responseObject } from "./responseObjectServices.js";

export const apiProcessing = async (data, processingSteps) =>{
    
    //## step 1: loop through each steps
    loopStep: 
    for( var currentStepObject of processingSteps){
        console.log("Step: ", currentStepObject.stepNumber, "Step Name: ", currentStepObject.stepName, "loopStep start");
    // within each step
        loopData:
        for ( var currentDataRecord of data ){

            //##--check level, 1-5
            //im at data level 1
            if( currentStepObject.dataLevel==1){//process level 1 data, becuase current processing step is also for level 1

                //??-- check pre-condition before processing for more efficent loop processing, only run for selected records in a list.
                const preConditionResponseObject = calculateExpression(currentStepObject.preCondition, currentDataRecord);

                if ( preConditionResponseObject.success){
                    //?? pre-condition check passed
                    //## process current step for current step and current data record, now at level one, it could be a list, so only current data record is passed.
                    const processResult = await level1Processing(currentStepObject, currentDataRecord);
                    
                    if (processResult.success){
                        currentDataRecord = processResult.data;
                       //no return, process dont stop, continue to next loop.
                    } else {
                        //##--log exception
                        console.log("level1Processing failed");
                        console.log("Step number: ",currentStepObject.stepNumber,"Data level: ",currentStepObject.dataLevel, currentStepObject.processingType, "failed message",processResult.message);
                        return responseObject(false,"API_PROCESSING_ERROR",processResult.message,data);
                        break loopData;
                    }

                }else { //?? pre-Condition check failed
                    // Do nothing becuase pre-condition for this step is not true
                    console.log(currentStepObject.stepNumber, currentStepObject.dataLevel, currentStepObject.processingType, "pre-condition not met, skip this step");
                }

            }else{  // !(currentStepObject.dataLevel==1)
                //do nothing, because we are at level 1 but the current processing step is not for level 1
                console.log("Step Number: ",currentStepObject.stepNumber, "data level: ", currentStepObject.dataLevel, currentStepObject.processingType, "data level 1 but step is not for data level.");
            }
        }//end of dtat.forEach
    }// end of processingSteps.forEach 
}