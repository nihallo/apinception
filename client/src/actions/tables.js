import { TABLE_CREATE } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const createPost = (table) => async (dispatch) => {
  try {
    const { data } = await api.createTable(table);

    dispatch({ type: TABLE_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
