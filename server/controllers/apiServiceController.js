import express from 'express';
import { errorObject } from "../services/errorServices.js";
import { validateApiSchema, getProcessingSteps,getSanitizationAndValidationRule } from "../services/apiServices.js";
import { processingApiRequest } from "../services/apiProcessingServices.js";

const router = express.Router();

export const apiServiceController = async (req, res) => {
    const {apiId, apiRequestData} = req.body;
    //Validate json input format is correct based on api definition
    //
    const {schemaSanitation, schemaDefinition} = await getSanitizationAndValidationRule(apiId);
    const {success, object} = await validateApiSchema(apiRequestData,schemaSanitation,schemaDefinition);
    if (!success){
        res.status(400).json(errorObject("INVALID_REQUEST_FORMAT",object) );
    } else{
        //api request data format is valid, proceed with processing

        //get processing Steps
        const processingSteps = await getProcessingSteps(apiId);

        //processing api request data based on processing steps.
        const result = await processingApiRequest(object, processingSteps)

        res.status(200).json(object);
    };
    //save request data
    //start processing steps
    //save end result
    //return end result


}