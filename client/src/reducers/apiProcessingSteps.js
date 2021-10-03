import { API_PROCESSING_STEPS_CREATE,API_PROCESSING_STEPS_DELETE,API_PROCESSING_STEPS_UPDATE,API_PROCESSING_STEPS_FETCH_ALL } from '../constants/actionTypes';

const  apiProcessingStepsListing= (apiProcessingStepsListing = [], action) => {

  console.log("REDUCER--++ im inside reducer, action type:", action.type);
  console.log("REDUCER--payload: ",action.payload);

  switch (action.type) {
    case API_PROCESSING_STEPS_CREATE:
      return [...apiProcessingStepsListing, action.payload];
    case API_PROCESSING_STEPS_UPDATE:
      return apiProcessingStepsListing.map((apiProcessingStepsListingRecord)=>(apiProcessingStepsListingRecord._id===action.payload._id ? action.payload : apiProcessingStepsListingRecord));
    case API_PROCESSING_STEPS_DELETE:
      return apiProcessingStepsListing.filter((apiProcessingStepsListingRecord) => apiProcessingStepsListingRecord._id !== action.payload);
    case API_PROCESSING_STEPS_FETCH_ALL:
      return action.payload;
    default:
      return apiProcessingStepsListing;
  }
};

export default apiProcessingStepsListing;
