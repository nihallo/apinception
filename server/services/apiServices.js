import  inspector from "schema-inspector";
import { errorObject } from "./errorServices.js";

export const validateApiSchema = (data) => {

    //Get schema structure
        //schema that will be defined by UI for an user and apiID
    const schemaDefinition = {
        type: 'object',
        properties: {
                    companyCode:{type: 'string', optional: false, minLength: 3},
                    partnerCode:{type: 'string', optional: false, minLength: 3},
                    tripType:{type: 'string', optional: false},
                    groupType:{type: 'string', optional: false},
        periodOfInsuranceFrom:{type: 'date'},
            periodOfInsuranceTo:{type: 'date'},
                    countryCodes:{
                                type: 'array',
                                        items: 
                                        [{
                                                    type: 'object',
                                                properties: {countryCode: {type: 'string', optional: false, exactLength: 3} }
                                                
                                            }]
                                },
        noOfPersonTravelling:{type: 'integer'},
                        noOfAdult:{type: 'integer'},
                    noOfChild:{type: 'integer'},
                    promoCode:{type: 'string'}
        }
    };
    const schemaSanitation = {

        type: 'object',
        properties: {
                    companyCode:{type: 'string', rules: ["trim"] },
                    partnerCode:{type: 'string', rules: ["trim"] },
                    tripType:{type: 'string', rules: ["trim"]},
                    groupType:{type: 'string', rules: ["trim"]},
        periodOfInsuranceFrom:{type: 'date'},
            periodOfInsuranceTo:{type: 'date'},
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

    }
    if(1==2){
      console.log(errorObject("SCHEMA_NOT_FOUND","cannot find schema definition"));
      // return errors back to user
      return errorObject("SCHEMA_NOT_FOUND","cannot find schema definition");
    }
    //Sanitization 
    const sanitizedInput = inspector.sanitize(schemaDefinition,data);
    //validate structure
    const validationResult = inspector.validate(sanitizedInput, data);
    
    if (!validationResult.valid) {
      console.log('errors:', validationResult.error);
      // return errors back to user
      return errorObject("SCHEMA_VALIDATION_FAILED","data format is not matching with schema.");
    } else {
        return { success:true};
    }
}
