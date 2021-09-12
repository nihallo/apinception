import { calculateExpression } from "./calculationServices.js";
import { level1Processing } from "./level1ProcessingService.js";
import { responseObject } from "./responseObjectServices.js";

export const apiProcessing = async (data, processingSteps) =>{
    
    console.log("--apiProcessing in apiProcessingServices.js: starts");
    //## step 1: loop through each steps
    loopStep: 
    for( var currentStepObject of processingSteps){
        console.log("Step: ", currentStepObject.stepNumber, "Step Name: ", currentStepObject.stepName, "loopStep start");
    //## within each step
        loopDataLevel1:
        for ( var currentLevel_1_DataRecord of data ){
        //##--check level, 1-5
            //## im at data level 1
            if( currentStepObject.dataLevel==1){//## process level 1 data, becuase current processing step is also for level 1
                //TODO from pre-condition check to call processing service, looks like can be extract to one fucntion.

                //??-- check pre-condition before processing for more efficent loop processing, only run for selected records in a list.
                const preConditionResponseObject = calculateExpression(currentStepObject.preCondition, currentLevel_1_DataRecord);
                if ( preConditionResponseObject.success){
                    //?? pre-condition check passed
                    //## process current step for current step and current data record, now at level one, 
                    //## data object could be a list, so only current data record is passed.
                    const processResult = await level1Processing(currentStepObject, currentLevel_1_DataRecord);
                    if (processResult.success){
                        //## level_1 processing is success, update the current data record based on result
                        currentLevel_1_DataRecord = processResult.data;
                       //no return, process dont stop, continue to next loop.
                    } else {
                        //TODO: --log exception
                        //## level_1 processing failed, return error and stop loop
                        //TODO: now looks like stopped all loops include the step loop.

                        console.log("Step number: ",currentStepObject.stepNumber,"Data level: ",currentStepObject.dataLevel, currentStepObject.processingType, "failed message",processResult.message);
                        console.log("--apiProcessing in apiProcessingServices.js: failed.");
                        return responseObject(false,"API_PROCESSING_ERROR",processResult.message,data);
                        break loopDataLevel1;
                    }

                }else { 
                //??-- pre-Condition check failed
                    // Do nothing becuase pre-condition for this step is not true
                    console.log("level 1 pre-condition not met, skip this step", currentStepObject.stepNumber, currentStepObject.dataLevel, currentStepObject.processingType );
                }
            }else if(currentStepObject.dataLevel==2){//## process level 2 data
                console.log("apiProcessing in apiProcessingServices.js: level 2 data processing starts.");

                //## start to process level 2 data
                const currentLevel_2_DataList = currentLevel_1_DataRecord[currentStepObject.addToWhichListName];
                loopDataLevel2:
                for ( var currentLevel_2_DataRecord of currentLevel_2_DataList ){
                //TODO from pre-condition check to call processing service, looks like can be extract to one fucntion.

                    //??-- check pre-condition before processing for more efficent loop processing, only run for selected records in a list.
                    const preConditionResponseObject = calculateExpression(currentStepObject.preCondition, currentLevel_2_DataRecord);
                    if ( preConditionResponseObject.success){
                        console.log("currentLevel_2_DataRecord: ", currentLevel_2_DataRecord);
                    //TODO COPY STARTS
                    //?? pre-condition check passed
                    //## process current step for current step and current data record, now at level one, 
                    //## data object could be a list, so only current data record is passed.
                    const processResult = await level1Processing(currentStepObject, currentLevel_2_DataRecord);
                    if (processResult.success){
                        //## level_1 processing is success, update the current data record based on result
                        currentLevel_2_DataRecord = processResult.data;
                       //no return, process dont stop, continue to next loop.
                    } else {
                        //TODO: --log exception
                        //## level_1 processing failed, return error and stop loop
                        //TODO: now looks like stopped all loops include the step loop.

                        console.log("Step number: ",currentStepObject.stepNumber,"Data level: ",currentStepObject.dataLevel, currentStepObject.processingType, "failed message",processResult.message);
                        console.log("--apiProcessing in apiProcessingServices.js: failed.");
                        return responseObject(false,"API_PROCESSING_ERROR",processResult.message,data);
                        break loopDataLevel2;
                    }
                    //TODO COPY ENDS

                    } else{
                        //??-- pre-Condition check failed
                        // Do nothing becuase pre-condition for this step is not true
                        console.log("leve 2 pre-condition not met, skip this step",currentStepObject.stepNumber, currentStepObject.dataLevel, currentStepObject.processingType);
                    }
                    
                } // end of data loop level 2
            
                //end of level 2 data processing
                console.log("apiProcessing in apiProcessingServices.js: level 2 data processing ends.");

            }else{  // !(currentStepObject.dataLevel==1)
                //do nothing, because we are at level 1 but the current processing step is not for level 1
                console.log("Step Number: ",currentStepObject.stepNumber, "data level: ", currentStepObject.dataLevel, currentStepObject.processingType, "data level 1 but step is not for data level.");
            }
            //## im at data level 2



        }//end of dtat.forEach
    }// end of processingSteps.forEach 
}