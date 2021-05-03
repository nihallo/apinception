import { API_SUBMIT,API_FETCH_ALL, API_UPDATE, API_DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createApiStructure = (apiStructure) => async (dispatch) => {
  try {
    const { data } = await api.createApiStructure(apiStructure);    
    dispatch({ type: API_SUBMIT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateApiStructure = (id, apiStructure) => async (dispatch) => {
  try {
    const { data } = await api.updateApiStructure(id,apiStructure);    
    dispatch({ type: API_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteApiStructure = (id) => async (dispatch) => {
  try {
   await api.deleteApiStructure(id);    
    dispatch({ type: API_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};



export const getApiListing = () => async (dispatch) => {
  try {
    const { data } = await api.fetchApiListing();

    dispatch({ type: API_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};