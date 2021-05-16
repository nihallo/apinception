import express from 'express';
import mongoose from 'mongoose';

import Table from '../models/table.js';

const router = express.Router();


export const createTable = async (req, res) => {
    const table = req.body;

    const newTable = new Table({ ...table, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newTable.save();

        res.status(201).json(newTable );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getTables = async (req, res) => { 
    try {
        const tables = await Table.find();
                
        res.status(200).json(tables);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;