import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "../dataAccess/mongoPool.js";

import { evaluate } from "mathjs";


//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )
//  "columnNames": "{PromotionPercentage:1}",
//  "tableName": "PromotionSetup",
//  "whereCluse": "{PromotionCode : promoCode }",

export const getMasterData= async (tableName, columnNames, whereCluse) =>{

  console.log("getMasterData: did i come here? getMasterData");
  let db;

  mongoPool.getInstance(function(client){
    console.log("getMasterData --getInstance: did i come here? getInstance db:",tableName);
    db = client.db('apinception');
  });

  try{

    const {query,options} =  constructFindObject(whereCluse, columnNames);
    console.log("find the object: ", query, " columns:",options);
 
//testing evalute for multiple value for the same varible
    const scope = {
      a: 3,
      b: 4,
      d:{a:0} ,
    };
    console.log("calculate math************", evaluate('a * b', scope));

    await db.collection(tableName)
            .find(query,options)
            .toArray(function(err, result) {
              if (err) throw err;
              console.log("db result: ",result);
            });

    return responseObject(true,"QUERY SUCCESS", "DB QUERY SUCCESS");
  } catch(error){
    console.log("try db query failed: ", error);
    return responseObject(false,"GET_MASTER_DATA_FAILED", error.message ,error);

  }

}

const constructFindObject = (query,  options)=>{

   query = {PromotionCode : '20DISC'};
   options = {
    projection: { PromotionPercentage:1}
  };
  return {query, options};
}


/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereCluse": "PromotionCode : promoCode ", */

    // Query for a movie that has the title 'The Room'
/*     const query = { title: "The Room" };
    const options = {
      // sort matched documents in descending order by rating
      sort: { rating: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    const movie = await movies.findOne(query, options); */