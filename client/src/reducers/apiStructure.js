import { API_SUBMIT ,API_FETCH_ALL, API_UPDATE, API_DELETE} from '../constants/actionTypes';

const  apiStructure = (apiListing = [], action) => {
  switch (action.type) {
    case API_SUBMIT:
      return [...apiListing, action.payload];
    case API_UPDATE:
      return apiListing.map((apiRecord)=>(apiRecord._id===action.payload._id ? action.payload : apiRecord));
    case API_DELETE:
      return apiListing.filter((apiRecord) => apiRecord._id !== action.payload);
    case API_FETCH_ALL:
      return action.payload;
    default:
      return apiListing;
  }
};

export default apiStructure;
