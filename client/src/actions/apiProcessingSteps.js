import { API_PROCESSING_STEPS_CREATE,API_PROCESSING_STEPS_DELETE,API_PROCESSING_STEPS_UPDATE,API_PROCESSING_STEPS_FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const createApiProcessingSteps = (apiProcessingSteps) => async (dispatch) => {
    try {
      const { data } = await api.createApiProcessingSteps(apiProcessingSteps);    
      dispatch({ type: API_PROCESSING_STEPS_CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const getApiProcessingSteps = () => async (dispatch) => {
    try {
      const { data } = await api.fetchApiProcessingSteps();
    
      console.log("+++ data from api server: ", data);

      dispatch({ type: API_PROCESSING_STEPS_FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };