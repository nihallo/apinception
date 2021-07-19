import express from 'express';
import { errorObject } from "../services/errorServices.js";
import { validateApiSchema } from "../services/apiServices.js";

const router = express.Router();

export const apiServiceController = async (req, res) => {
    const apiStructure = req.body;
    //log input
    console.log("api request body: ",req.body);
    //Validate json input format is correct based on api definition
    const validateResult = await validateApiSchema(req.body);
    if (!validateResult.success){
        res.status(400).json(errorObject("INVALID_REQUEST_FORMAT","Json format is not matching with the definition.") );
    } else{
        res.status(200).json({validateResult});
    };
    //save request data
    //start processing steps
    //save end result
    //return end result


}