import { TABLE_CREATE, TABLE_DELETE, TABLE_FETCH_ALL} from '../constants/actionTypes';

export default (tables = [], action) => {
  switch (action.type) {
    case TABLE_CREATE:
      return [...tables, action.payload];
      case TABLE_FETCH_ALL:
        return action.payload;
        case TABLE_DELETE:
          return tables.filter((table) => table._id !== action.payload);
    default:
      return tables;
  }
};

