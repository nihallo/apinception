import express from 'express';
import { errorObject } from "../services/errorServices.js";
import { validateApiSchema, getProcessingSteps, getProcessingResult,getSanitizationAndValidationRule } from "../services/apiServices.js";

const router = express.Router();

export const apiServiceController = async (req, res) => {
    const {apiId, apiRequestData} = req.body;
    //Validate json input format is correct based on api definition
    //
    const {schemaSanitation, schemaDefinition} = await getSanitizationAndValidationRule(apiId);
    const {success, object} = await validateApiSchema(apiRequestData,schemaSanitation,schemaDefinition);
    if (!success){
        res.status(400).json(errorObject("INVALID_REQUEST_FORMAT","Json format is not matching with the definition.") );
    } else{
        const processingSteps = await getProcessingSteps(apiId);
        const result = await getProcessingResult(object, processingSteps)

        res.status(200).json(object);
    };
    //save request data
    //start processing steps
    //save end result
    //return end result


}