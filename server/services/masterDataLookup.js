import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "./dataAccess/mongoPool.js";

//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )


export const getMasterData= async (tableName, columnNames, whereCluse) =>{
  mongoPool.getInstance(function (db){
    // Query your MongoDB database.
    try{    
      const promo = await db.collection(tableName, columnNames).find(whereCluse);
      return responseObject(true,"QUERY SUCCESS", "DB QUERY SUCCESS",promo);
    }catch(error){
      return responseObject(false,"QUERY_DB_FAILED", error.message,error);
    }

});

}


/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereCluse": "PromotionCode : promoCode ", */
