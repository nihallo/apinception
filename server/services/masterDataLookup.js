import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "../dataAccess/mongoPool.js";
import { calculateExpression } from "./calculationServices.js";
import { evaluate } from "mathjs";


//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )
//  "columnNames": "{PromotionPercentage:1}",
//  "tableName": "PromotionSetup",
//  "whereClause": "{PromotionCode : promoCode }",

export const getMasterData= async (tableName, columnNames, whereClause, currentDataRecord) =>{
  console.log("-----Reading Data Starts-----");
  let queryObject ={};
  let options={}
  let db;
  mongoPool.getInstance(function(client){
    db = client.db('apinception');
  });

  try{
    //TODO : columns can be multiple separate by , cannot have space.
    const findObjectResponse =  constructFindObject(whereClause, columnNames,currentDataRecord);
    if (findObjectResponse.success ){
      queryObject =findObjectResponse.data.queryObject;
      options=findObjectResponse.data.options;
    } else{
      console.log("Construct query object failed", findObjectResponse.data);
      return responseObject(false,"GET_MASTER_DATA_FAILED", "Unable to construct query object",findObjectResponse.data);
    }

    /*     //testing evalute for multiple value for the same varible
    const scope = {
      a: 3,
      b: 4,
      d:{a:0} ,
    };
    //TODO understand more on evaluate
    console.log("calculate math************", evaluate('a * b', scope)); */
    console.log("--before aysnc getData");
    console.log("-queryObject: ",queryObject);
    console.log("-options: ",options);

    async function getData () {
      return new Promise(function(resolve, reject) {
        db.collection(tableName)
        .find(queryObject,options)
        .toArray( function(error, docs) {
          if (error) {
            // Reject the Promise with an error
            console.log("-----Reading Data Ends Failed-----", "Error:",error);
            return reject(responseObject(false,"GET_MASTER_DATA_FAILED", error.message ,error));
          }
          // Resolve (or fulfill) the promise with data
          console.log("-----Reading Data Ends Success-----", "Data:",docs);
          return resolve(responseObject(true,"QUERY_DB_SUCCESS","QUERY_DB_SUCCESS",docs));
        })
      });
    };
    return await getData();
  }
  catch(error){
    console.log("try db query failed: ", error);
    return reject(responseObject(false,"GET_MASTER_DATA_FAILED", error.message ,error));
  }
}

const constructFindObject = (whereClause,  columns, dataRecord)=>{
  console.log("---Start constructFindObject: constructFindObject in getMasterData in masterDataLookup.js");
  console.log("-whereClause: ",whereClause);
  console.log("-columns: ",columns);
  // construct queryObject
  var queryObject ={};
  var whereCluaseLoopFailed=false;
  var whereCluaseLoopFailedData ={};
  whereClause.some(function(whereList){
    //## replace value for one where clause
    //##COPY TODO: copied from add field, calculate, any chance refactoer?
    //TODO: FILTER CONDITION ONLY SUPPORT "=" & "and"
    //## if and, format https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
    //## if or, format 
    //TODO if others value, return error, but should control from UI
      const whereClauseFieldValueCalculate = calculateExpression(whereList.whereClauseValue, dataRecord);
      if(whereClauseFieldValueCalculate.success){ 
        queryObject[whereList.whereClauseFieldName] = whereClauseFieldValueCalculate.data;
      } else{
          console.log("-where clause value calculation error: ", whereClauseFieldValueCalculate.message);
          whereCluaseLoopFailed=true;
          whereCluaseLoopFailedData =whereClauseFieldValueCalculate.data;
          return true;
      };
      //##COPY END 
      //TODO HERE HERE
      console.log("-check constructed where :", queryObject);
    }
  )
  //## check whether the loop stopped due to error
  if (whereCluaseLoopFailed){
    console.log("-where clause construct, one of the step in the loop failed");
    console.log("---End constructFindObject: constructFindObject in getMasterData in masterDataLookup.js");
    return responseObject(false, "CONSTRUCT_FIND_OBJECT_ERROR", "Calculate express for value field failed.", whereCluaseLoopFailedData);
  }

  let options ={};
  let optionsProjectionObject={};
  columns.split(",").forEach(function(column){
    optionsProjectionObject[column]=1;
  });
  const projectionKey="projection";
  options[projectionKey]=optionsProjectionObject;
  console.log("-construction projection",options);
  console.log("---End constructFindObject: constructFindObject in getMasterData in masterDataLookup.js");

  return responseObject(true,"CONSTRUCT_FIND_OBJECT_SUCCESS","construct success",{queryObject, options});
}

export const getApiDefination = async (apiCode) =>{

  let db;
  mongoPool.getInstance(function(client){
    db = client.db('myFirstDatabase');
  });
  try{

    async function getData () {
      return new Promise(function(resolve, reject) {
        db.collection('apistructures')
        .find({apiCode : apiCode})
        .toArray( function(error, docs) {
          if (error) {
            // Reject the Promise with an error
            console.log("-----Reading Data Ends Failed-----", "Error:",error);
            return reject(responseObject(false,"GET_MASTER_DATA_FAILED", error.message ,error));
          }
          // Resolve (or fulfill) the promise with data
          console.log("-----Reading Data Ends Success-----", "Data:",docs);
          return resolve(responseObject(true,"QUERY_DB_SUCCESS","QUERY_DB_SUCCESS",docs[0]));
        })
      });
    };
    return await getData();
  }
  catch(error){
    console.log("try db query failed: ", error);
    return reject(responseObject(false,"GET_MASTER_DATA_FAILED", error.message ,error));
  }
}

/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereClause": "PromotionCode : promoCode ", */

    // Query for a movie that has the title 'The Room'
/*     const query = { title: "The Room" };
    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    const movie = await movies.findOne(query, options); */



 /*    function checkUpdateTime(last_updated){
      var collection = db.collection(last_updated);
      return collection.insert({ a : 1 }) // also async
                       .then(function() {
                         return collection.find({ a : 1 }).toArray();
                       });
    }
    checkUpdateTime('last_updated').then(function(updateTimes) {
      console.log(updateTimes);
    }); */