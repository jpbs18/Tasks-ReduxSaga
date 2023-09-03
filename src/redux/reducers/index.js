import { tasksReducer } from "./task-reducers";
import { combineReducers } from "redux";

export const reducers = combineReducers({ tasks: tasksReducer })
