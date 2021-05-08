import { TABLE_CREATE, TABLE_FETCH_ALL} from '../constants/actionTypes';

export default (tables = [], action) => {
  switch (action.type) {
    case TABLE_CREATE:
      return [...tables, action.payload];
      case TABLE_FETCH_ALL:
        return action.payload;
    default:
      return tables;
  }
};

