import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "../dataAccess/mongoPool.js";

import { evaluate } from "mathjs";


//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )
//  "columnNames": "{PromotionPercentage:1}",
//  "tableName": "PromotionSetup",
//  "whereClause": "{PromotionCode : promoCode }",

export const getMasterData= async (tableName, columnNames, whereClause) =>{
  console.log("-----Reading Data Starts-----");

  let db;
  mongoPool.getInstance(function(client){
    db = client.db('apinception');
  });

  try{
    //TODO : columns can be multiple separate by ,
    
    const {query,options} =  constructFindObject(whereClause, columnNames);

    //testing evalute for multiple value for the same varible
    const scope = {
      a: 3,
      b: 4,
      d:{a:0} ,
    };
    console.log("calculate math************", evaluate('a * b', scope));

    async function getData () {
      return new Promise(function(resolve, reject) {
        db.collection(tableName)
        .find(query,options)
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

const constructFindObject = (query,  options)=>{
// TODOHERE
  console.log("constructFindObject in getMasterData in masterDataLookup.js");
  console.log("query: ",query);
  console.log("options: ",options);
   query = {PromotionCode : '20DISC'};
   options = {
    projection: { PromotionPercentage:1}
  };
  return {query, options};
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