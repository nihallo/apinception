import express from 'express';
import mongoose from 'mongoose';

import Table from '../models/table.js';

const router = express.Router();


export const createTable = async (req, res) => {
    const table = req.body;

    const newTable = new Table({tableName:table.tableName, 
                                tableCode: table.tableCode,
                                tableDataObject: JSON.parse(table.tableDataObject),
                                creator: req.userId, 
                                createdAt: new Date().toISOString() })

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

export const uploadTable = async (req, res) => {

    const table = req.body;
    try {
        if (req.file == undefined) {
            return res.status(400).send({
                message: "No file send in the request, please upload a CSV file!"
            });
        }

        // Import CSV File to MongoDB database
        let csvData = [];
        let filePath = __basedir + '/uploads/' + req.file.filename;
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                csvData.push(row);
            })
            .on("end", () => {

                // Establish connection to the database
                var url = "mongodb://localhost:27017/TestDb";
                var dbConn;
                mongodb.MongoClient.connect(url, {
                    useUnifiedTopology: true,
                }).then((client) => {
                    console.log('DB Connected!');
                    dbConn = client.db();

                    //inserting into the table "employees"
                    var collectionName = 'employees';
                    var collection = dbConn.collection(collectionName);
                    collection.insertMany(csvData, (err, result) => {
                        if (err) console.log(err);
                        if (result) {
                            res.status(200).send({
                                message:
                                    "Upload/import the CSV data into database successfully: " + req.file.originalname,
                            });
                            client.close();
                        }
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: err.message,
                    });
                });
            });
    } catch (error) {
        console.log("catch error-", error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}
export const deleteTable = async (req, res) => {
    const { id } = req.params;
    
    await Table.findByIdAndRemove(id);

    res.json({ message: "Table is deleted successfully.", _id:id });
}

export default router;