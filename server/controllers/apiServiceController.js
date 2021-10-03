import express from 'express';
import { responseObject } from "../services/responseObjectServices.js";
import { validateApiSchema } from "../services/dataValidationServices.js";
import { apiProcessing } from "../services/apiProcessingServices.js";
import { getApiDefination ,getApiProcessingStepsList } from "../services/masterDataLookup.js";

const router = express.Router();

export const apiServiceController = async (req, res) => {
    const {apiCode, apiRequestData} = req.body;
    //Validate json input format is correct based on api definition
    //sanitize and vlidate the input json format against defined strcuture 
    //structure is defined based on apiId
    
    //## step 1 get definition
    const apiDefinitionObject = await getApiDefination(apiCode);
        //TODO: If failed.
        let apiSanitization={};
        let apiValidation = {};
    if(apiDefinitionObject.success){
        apiSanitization = apiDefinitionObject.data.apiSanitization;
        apiValidation = apiDefinitionObject.data.apiValidation;
    }else {
        console.log("CANNOT_FIND_API_DEFINATION: API CODE: ",apiCode);
        res.status(400).json(responseObject(false,"CANNOT_FIND_API_DEFINATION","cannot find api setup based on api code: ",apiCode) );
    }

    //## step 2 sanitize and validate
    const {success, object} = validateApiSchema(apiRequestData,apiSanitization,apiValidation);
    if (!success){
        res.status(400).json(responseObject(false,"INVALID_REQUEST_FORMAT",object) );
    } else{
        //?? api request data format is valid, proceed with processing

        //## step 1: get processing Steps
        const processingStepsListObject = await getApiProcessingStepsList(apiCode);
            //TODO: if failed.
        let processingStepsList=[];
        if(processingStepsListObject.success){
            processingStepsList = processingStepsListObject.data.apiProcessingStepsObject;
        }else {
            console.log("CANNOT_FIND_API_PROCESSING_STEP_DEFINATION: API CODE: ",apiCode);
            res.status(400).json(responseObject(false,"CANNOT_FIND_API_PROCESSING_STEP_DEFINATION","cannot find api processing based on api code: ",apiCode) );
        }

        //## step 2: processing api request data based on processing steps.
        const result = await apiProcessing(object, processingStepsList);
        if(result.success){
            res.status(200).json(result);
        } else{
            res.status(400).json(result );
        }

    };
    //save request data
    //start processing steps
    //save end result
    //return end result


}