import express from 'express';

import ApiProcessingSteps from '../models/apiProcessingSteps.js';

const router = express.Router();

export const createApiProcessingSteps = async (req, res) => {
    const apiStructure = req.body;
    
    const newApiProcessingSteps = new ApiProcessingSteps({  apiName: apiStructure.apiName,
                                                            apiCode:apiStructure.apiCode,
                                                            apiProcessingStepsObject: JSON.parse(apiStructure.apiProcessingStepsObject),
                                                            creator: req.userId, 
                                                            createdAt: new Date().toISOString() })

    try {
        await newApiProcessingSteps.save();

        res.status(201).json(newApiProcessingSteps );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getApiProcessingSteps = async (req, res) => { 
    try {
        const apiProcessingStepsListing = await ApiProcessingSteps.find();
        console.log("++ what is passed to frontend?", apiProcessingStepsListing);
        res.status(200).json(apiProcessingStepsListing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteApiProcessingSteps = async (req, res) => {
    const { id } = req.params;
    
    await ApiProcessingSteps.findByIdAndRemove(id);

    res.json({ message: "API processing step is deleted successfully.", _id:id });
}
