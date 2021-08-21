import express from 'express';
import { responseObject } from "../services/responseObjectServices.js";
import { validateApiSchema, getProcessingSteps,getSanitizationAndValidationRule } from "../services/apiServices.js";
import { apiProcessing } from "../services/apiProcessingServices.js";

const router = express.Router();

export const apiServiceController = async (req, res) => {
    const {apiId, apiRequestData} = req.body;
    //Validate json input format is correct based on api definition
    //sanitize and vlidate the input json format against defined strcuture 
    //structure is defined based on apiId
    //## step 1 get definition
    const {schemaSanitation, schemaDefinition} = await getSanitizationAndValidationRule(apiId);
    //## step 2 sanitize and validate
    const {success, object} = validateApiSchema(apiRequestData,schemaSanitation,schemaDefinition);
    if (!success){
        res.status(400).json(responseObject(false,"INVALID_REQUEST_FORMAT",object) );
    } else{
        //?? api request data format is valid, proceed with processing

        //## step 1: get processing Steps
        const processingSteps = await getProcessingSteps(apiId);

        //## step 2: processing api request data based on processing steps.
        const result = await apiProcessing(object, processingSteps);
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