import { UPDATE_CURRENT_ID } from '../constants/actionTypes';

export const updateCurrentId = (currentId) => (dispatch) => {
  try {
      console.log("current id action: ", currentId);
    dispatch({ type: UPDATE_CURRENT_ID, payload: currentId });
  } catch (error) {
    console.log(error);
  }
};