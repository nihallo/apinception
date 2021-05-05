import { TABLE_CREATE} from '../constants/actionTypes';

export default (tables = [], action) => {
  switch (action.type) {
    case TABLE_CREATE:
      return [...tables, action.payload];
    default:
      return tables;
  }
};

