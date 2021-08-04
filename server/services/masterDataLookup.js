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

    const findObject = whereCluse+","+columnNames;
    console.log("find the object: ", findObject);
/* testing evalute for multiple value for the same varible
    const scope = {
      a: 3,
      b: 4,
      d:{a:0} ,
    };
    console.log("calculate math************", evaluate('a * b', scope));
*/

    await db.collection(tableName)
            .find(findObject)
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


/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereCluse": "PromotionCode : promoCode ", */
