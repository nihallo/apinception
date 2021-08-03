import {responseObject} from "../services/responseObjectServices.js";
import  mongoPool from "../dataAccess/mongoPool.js";

//db.inventory.find( { status: "A" }, { item: 1, status: 1 } )


export const getMasterData= async (tableName, columnNames, whereCluse) =>{

  console.log("getMasterData: did i come here? getMasterData");

  mongoPool.getInstance(function(db){
    console.log("getMasterData --getInstance: did i come here? getInstance");
    try{   
      async function asyncCall(db){
        console.log("did i come in here? inside async try");
        const queryResult = await db.collection('PromotionSetup').find(columnNames, whereCluse);
        console.log("result from mongo db: ",queryResult);
        return responseObject(true,"QUERY SUCCESS", "DB QUERY SUCCESS",promo);
      }
      asyncCall(db);
  
    }catch(error){
      console.log("error query db.");
      return responseObject(false,"QUERY_DB_FAILED", error.message,error);
    }
  });
  console.log("getMasterData: did i come here? last step of the function with out return?????");

}


/* "columnNames": "PromotionPercentage",
"tableName": "PromotionSetup",
"whereCluse": "PromotionCode : promoCode ", */
