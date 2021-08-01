
import {responseObject} from "../services/responseObjectServices.js";


export const verifyTokenGetId = async (token) => {
}


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://testuser:V3qF3AAbnJF9zL7@cluster0-xyl9j.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true});

client.connect(function(err, client){
    assert.strictEqual(null, err);
    const apiSetupColl = client.db("sample_airbnb").collection("ApiSetup");
    const apiTransactionColl = client.db("sample_airbnb").collection("ApiTransaction");
});

apiSetupColl
.find({ userID: 'USER001'})
.toArray(function(err, result) {
      if (err) throw err;
      const schemaDefinitionInDB = result[0].schemaDefinition;
      const validationResult = inspector.validate(schemaDefinitionInDB, apiRequestData);
  
    if (!validationResult.valid) {
      console.log('errors:', validationResult.error);
      // return errors back to user
    }
    else {
          // insert or update the payload to your db
        apiTransactionColl.insertOne(apiRequestData, function(err, db){
          if (err) throw err;
          console.log("1 transaction document is inserted based on saved schema, wowho");
          
          client.close();
          });
        }
    })