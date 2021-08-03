import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "../dataAccess/mongoPool.js";

//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )
//  "columnNames": "{PromotionPercentage:1}",
//  "tableName": "PromotionSetup",
//  "whereCluse": "{PromotionCode : promoCode }",

export const getMasterData= async (tableName, columnNames, whereCluse) =>{

  console.log("getMasterData: did i come here? getMasterData");
  let db;

  mongoPool.getInstance(function(client){
    console.log("getMasterData --getInstance: did i come here? getInstance db:",db);
    db = client.db('apinception');
  });

  try{

    await db.collection('PromotionSetup')
            .find({PromotionCode : "20DISC" },{PromotionPercentage:1})
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
