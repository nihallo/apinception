import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import apiStructure from './apiStructure';
import currentId from './currentId';
import tables from './tables';
import apiProcessingSteps from './apiProcessingSteps';

export const reducers = combineReducers({ posts, auth , apiStructure, currentId, tables, apiProcessingSteps});