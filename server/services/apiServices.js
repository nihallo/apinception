import  inspector from "schema-inspector";
import { errorObject } from "./errorServices.js";

export const validateApiSchema = (data,schemaSanitation, schemaDefinition) => {
    //sanitize the data, data will be updated based on sanitization rules
    //validate whether 

    //Get schema structure
        //schema that will be defined by UI for an user and apiID

    if(1==2){
      console.log(errorObject("SCHEMA_NOT_FOUND","cannot find schema definition"));
      // return errors back to user
      return errorObject("SCHEMA_NOT_FOUND","cannot find schema definition");
    }
    //Sanitization the data
    inspector.sanitize(schemaSanitation,data);
    //validate structure
    const validationResult = inspector.validate(schemaDefinition, data);
    
    if (!validationResult.valid) {
        console.log('errors:', validationResult.error);
        // return errors back to user
        return errorObject("SCHEMA_VALIDATION_FAILED", validationResult.error);
    } else {
        return { success:true, object:data };
    }
}

export const getProcessingSteps = async (apiId) =>{

    return (
        [
            {
                "stepNumber": 1,
                "stepName": "add age field to level 1",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": 1,
                "addToWhichListName": "apiRequestData",
                "fieldName": "ageLastBirthday",
                "columnNames": "",
                "addFieldMethod": "CALCULATE",
                "formula": " periodOfInsuranceTo - periodOfInsuranceFrom ",
                "tableName": "",
                "whereCluse": "",
                "sequenceCode": "",
                "errorType": "",
                "errorMessage": ""
            },
            {
                "stepNumber": 2,
                "stepName": "validate age >17",
                "preCondition": "1==1",
                "processingType": "VALIDATE",
                "dataLevel": "LEVEL_1",
                "addToWhichListName": "",
                "fieldName": "",
                "columnNames": "",
                "method": "CALCULATE",
                "formula": "LEVEL_1.ageLastBirthday>17",
                "tableName": "",
                "whereCluse": "",
                "sequenceCode": "",
                "errorType": "WARNNING",
                "errorMessage": "Age is more than 17 years old."
            },
            {
                "stepNumber": 3,
                "stepName": "add premium and plans",
                "preCondition": "1==1",
                "processingType": "ADD_LIST",
                "dataLevel": "LEVEL_1",
                "addToWhichListName": "",
                "fieldName": "PlanDetailList",
                "columnNames": "alb, PlanBaseOnPrem, SA, Benefit, Libility, PremBreakdown",
                "method": "QUERY_DB",
                "formula": "",
                "tableName": "PlanDetailList",
                "whereCluse": "alb :dataAtLevel0.ageLastBirthday",
                "sequenceCode": "",
                "errorType": "WARNNING",
                "errorMessage": "Age is more than 17 years old."
            },
            {
                "stepNumber": 4,
                "stepName": "add gst",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": "LEVEL_2",
                "addToWhichListName": "PlanDetailList",
                "fieldName": "gstAmount",
                "columnNames": "",
                "method": "CALCULATE",
                "formula": "lEVEL_1.PlanDetailList.PremBreakdown * 7%",
                "tableName": "",
                "whereCluse": "",
                "sequenceCode": "",
                "errorType": "",
                "errorMessage": ""
            },
            {
                "stepNumber": 5,
                "stepName": "add quotation number",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": "LEVEL_1",
                "addToWhichListName": "",
                "fieldName": "quotationNumber",
                "columnNames": "",
                "method": "SEQUENCE",
                "formula": "",
                "tableName": "",
                "whereCluse": "",
                "sequenceCode": "quotationSequence",
                "errorType": "",
                "errorMessage": ""
            }
        ]);
}

export const getSanitizationAndValidationRule = (apiId) =>{
    const schemaDefinition = {
        type:'array',
        items:
        [{
            type: 'object',
            properties: {
                        companyCode:{type: 'string', optional: false, minLength: 3},
                        partnerCode:{type: 'string', optional: false, minLength: 3},
                        tripType:{type: 'string', optional: false},
                        groupType:{type: 'string', optional: false},
                        periodOfInsuranceFrom:{type: 'integer'},
            periodOfInsuranceTo:{type: 'integer'},
                noOfPersonTravelling:{type: 'integer'},
                        noOfAdult:{type: 'integer'},
                        noOfChild:{type: 'integer'},
                        promoCode:{type: 'string'},
                        countryCodes:{
                                    type: 'array',
                                    items: 
                                        [{
                                            type: 'object',
                                            properties: {countryCode: {type: 'string', optional: false, exactLength: 3} }
                                        }]
                        }
        }
    }]
};
    const schemaSanitation = {
        type: 'array',
        items: [{
                type: 'object',
                properties: {
                            companyCode:{type: 'string', rules: ["trim"] },
                            partnerCode:{type: 'string', rules: ["trim"] },
                            tripType:{type: 'string', rules: ["trim"]},
                            groupType:{type: 'string', rules: ["trim"]},
                periodOfInsuranceFrom:{type: 'integer'},
                    periodOfInsuranceTo:{type: 'integer'},
                            countryCodes:{
                                        type: 'array',
                                                items: 
                                                [{
                                                        type: 'object',
                                                        properties: {countryCode: {type: 'string' ,rules: ["trim"]} }
                                                    }]
                                        },
                noOfPersonTravelling:{type: 'integer'},
                            noOfAdult:{type: 'integer'},
                            noOfChild:{type: 'integer'},
                            promoCode:{type: 'string'}
                }
        }]
    };
    return {schemaSanitation, schemaDefinition}
}