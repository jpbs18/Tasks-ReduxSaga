import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_CANCEL
} from "../constants/action-types";

const initialState = {
  tasksList: [],
  isLoading: false,
  error: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasksList: [...state.tasksList, action.payload],
      };

    case DELETE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasksList: state.tasksList.filter((task) => task.id !== action.payload),
      };

    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasksList: action.payload,
        isLoading: false,
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
