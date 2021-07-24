import * from "../constants/constants.js";

export const processingApiRequest = async (data, processingSteps) =>{
    
    //loop through each steps
    processingSteps.forEach(stepObj=>{
        console.log("steps: ",stepObj.stepNumber);
        // within each step
        data.forEach(apiData =>{
            console.log("data item inside processing step", apiData);

            //##--check level, 1-5
            //im at data level 1
            if( stepObj.data_level==1)
            {
                //process level 1 data, becuase current processing step is also for level 1

                //##--check processing type


            }else{
                // do nothing, because we are at level 1 but the current processing step is not for level 1
            }
        })
    })
    return {"jsonResult":" result from get procesing result."};
}