import  inspector from "schema-inspector";
import { responseObject } from "./responseObjectServices.js";

export const validateApiSchema = (data,schemaSanitation, schemaDefinition) => {
    //## step 1: sanitize the data, data will be updated based on sanitization rules
    //## step 2: validate data against definition

    //## step 1: Sanitization the data
    inspector.sanitize(schemaSanitation,data);
    
    //## step 2: validate data against definition
    const validationResult = inspector.validate(schemaDefinition, data);
    
    if (!validationResult.valid) {
        console.log('errors:', validationResult.error);
        // return errors back to user
        return responseObject(false,"SCHEMA_VALIDATION_FAILED", validationResult.error);
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
                "formula": " floor((periodOfInsuranceFrom-dateOfBirth)/1000/60/60/24/30/12,0) ",
                "whereClause": "",
                "sequenceCode": "",
                "errorType": "",
                "errorMessage": ""
            },
            {
                "stepNumber": 2,
                "stepName": "checkk whether age is more than 17",
                "preCondition": "1==1",
                "processingType": "VALIDATION",
                "dataLevel": 1,
                "addToWhichListName": "",
                "fieldName": "",
                "columnNames": "",
                "addFieldMethod": "CALCULATE",
                "formula": "ageLastBirthday>17",
                "tableName": "",
                "whereClause": "",
                "sequenceCode": "",
                "errorType": "WARNNING",
                "errorMessage": "Age is more than 17 years old."
            },
            {
                "stepNumber": 3,
                "stepName": "checkk age again",
                "preCondition": "1==1",
                "processingType": "VALIDATION",
                "dataLevel": 1,
                "addToWhichListName": "",
                "fieldName": "",
                "columnNames": "",
                "addFieldMethod": "CALCULATE",
                "formula": "ageLastBirthday>17",
                "tableName": "",
                "whereClause": "",
                "sequenceCode": "",
                "errorType": "ERROR",
                "errorMessage": "Age is more than 17 years old."
            },            
            {
                "stepNumber": 4,
                "stepName": "prom discount",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": 1,
                "addToWhichListName": "",
                "fieldName": "promoDiscount",
                "addFieldMethod": "QUERY_DB",
                "formula": "",
                "columnNames": "{PromotionPercentage:1}",
                "tableName": "PromotionSetup",
                "whereClause": [ {"whereClauseFieldName":'PromotionCode', "whereClauseOperator":':', "whereClauseValue":'promoCode', "whereClauseJoinNext":"AND"},
                                {"whereClauseFieldName":'PromotionCode', "whereClauseOperator":':', "whereClauseValue":'promoCode', "whereClauseJoinNext":""}],
                "sequenceCode": "",
                "errorType": "ERROR",
                "errorMessage": "Unable to retrive promo discount."
            },
            {
                "stepNumber": 5,
                "stepName": "add area code",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": 2,
                "addToWhichListName": "countryCodes",
                "fieldName": "areaCode",
                "addFieldMethod": "QUERY_DB",
                "formula": "",
                "columnNames": "areaCode",
                "tableName": "Country",
                "whereClause": "CountryCode : countryCode ",
                "sequenceCode": "",
                "errorType": "ERROR",
                "errorMessage": "Unable to retrive country area code."
            },
            {
                "stepNumber": 6,
                "stepName": "add premium and plans",
                "preCondition": "1==1",
                "processingType": "ADD_LIST",
                "dataLevel": 1,
                "addToWhichListName": "",
                "fieldName": "PremiumSetup",
                "columnNames": "Area, Plan,Premium",
                "addFieldMethod": "QUERY_DB",
                "formula": "",
                "tableName": "PremiumSetup",
                "whereClause": "GroupType: groupType, TripType: tripType, NoOfDays: noOfDays",
                "sequenceCode": "",
                "errorType": "WARNNING",
                "errorMessage": "Age is more than 17 years old."
            },
            {
                "stepNumber": 7,
                "stepName": "add gst",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": 1,
                "addToWhichListName": "PlanDetailList",
                "fieldName": "gstAmount",
                "columnNames": "",
                "addFieldMethod": "CALCULATE",
                "formula": "lEVEL_1.PlanDetailList.PremBreakdown * 7%",
                "tableName": "",
                "whereClause": "",
                "sequenceCode": "",
                "errorType": "",
                "errorMessage": ""
            },
            {
                "stepNumber": 8,
                "stepName": "add quotation number",
                "preCondition": "1==1",
                "processingType": "ADD_FIELD",
                "dataLevel": 1,
                "addToWhichListName": "",
                "fieldName": "quotationNumber",
                "columnNames": "",
                "addFieldMethod": "SEQUENCE",
                "formula": "",
                "tableName": "",
                "whereClause": "",
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
            noOfDays:{type: 'integer'},
            dateOfBirth:{type: 'integer'},
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
                    noOfDays:{type: 'integer'},
                    dateOfBirth:{type: 'integer'},
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