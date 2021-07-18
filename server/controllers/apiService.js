import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const apiService = async (req, res) => {
    const apiStructure = req.body;
    res.status(200).json(apiStructure );
    //log input
    //Validate json input format is correct based on api definition
    //save request data
    //start processing steps
    //save end result
    //return end result

}