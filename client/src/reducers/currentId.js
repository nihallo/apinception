import { UPDATE_CURRENT_ID} from '../constants/actionTypes';

const  currentId = (currentId=0,action) => {
  console.log('i am inside currentid reducer, action:', action);
  switch (action.type) {
    case UPDATE_CURRENT_ID:
      return  action.payload;
    default:
      return currentId;
  }
};

export default currentId;
