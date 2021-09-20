import { TABLE_CREATE, TABLE_DELETE, TABLE_FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createTable = (table) => async (dispatch) => {
  try {
    const { data } = await api.createTable(table);

    dispatch({ type: TABLE_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTables = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTables();

    dispatch({ type: TABLE_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteTable = (id) => async (dispatch) => {
  try {
    await await api.deleteTable(id);

    dispatch({ type: TABLE_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
