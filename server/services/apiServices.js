const inspector = require('schema-inspector');
import { errorObject } from "./errorServices.js";


export const apiService = () => {
    return {"abc":"abc"}
}


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
    if(1==2){
      console.log(errorObject("SCHEMA_NOT_FOUND","cannot find schema definition"));
      // return errors back to user
      return errorObject("SCHEMA_NOT_FOUND","cannot find schema definition");
    }
    //validate structure
    const validationResult = inspector.validate(schemaDefinition, data);
    
    if (!validationResult.valid) {
      console.log('errors:', validationResult.error);
      // return errors back to user
      return errorObject("SCHEMA_VALIDATION_FAILED","data format is not matching with schema.");
    } else {
        return { success:true};
    }
}
