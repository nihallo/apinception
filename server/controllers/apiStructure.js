import express from 'express';
import mongoose from 'mongoose';

import ApiStructure from '../models/apiStructure.js';

const router = express.Router();

export const apiStructure = async (req, res) => {
    const apiStructure = req.body;
    const apiNameObject = apiStructure.apiName;
    const apiCodeObject = apiStructure.apiCode;
    const apiSanitizationObject = JSON.parse(apiStructure.apiSanitization);
    const apiValidation = JSON.parse(apiStructure.apiValidation);
    console.log("check format of the request", typeof(apiSanitizationObject));
    
    const newApiStructure = new ApiStructure({ apiName: apiNameObject,
                                                apiCode:apiCodeObject,
                                                apiSanitization: apiSanitizationObject,
                                                apiValidation: apiValidation,
                                                creator: req.userId, 
                                                createdAt: new Date().toISOString() })

    try {
        await newApiStructure.save();

        res.status(201).json(newApiStructure );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getApiListing = async (req, res) => { 
    try {
        const apiListing = await ApiStructure.find();
        res.status(200).json(apiListing);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateApiStructure = async (req, res) => {
    const { id } = req.params;
    const { apiName, apiCode, apiStructureText, creator } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedApiStructure = { apiName, apiCode, apiStructureText, creator, _id: id };

    await ApiStructure.findByIdAndUpdate(id, updatedApiStructure, { new: true });

    res.json(updatedApiStructure);
}

export const deleteApiStructure = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ApiStructure.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully.", _id:id });
}
