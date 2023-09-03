import {
  CREATE_TASK,
  FETCH_TASKS,
  DELETE_TASK,
  FETCH_TASKS_CANCEL
} from "../constants/action-types";


// Using redux-saga
export const fetchTasks = () => ({ type: FETCH_TASKS });
export const createTask = (newTask) => ({ type: CREATE_TASK, payload: newTask });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, payload: taskId });
export const cancelFetchTasks = () => ({ type: FETCH_TASKS_CANCEL });


// Using redux-thunk
// export const createTask = (newTask) => async (dispatch, getState) => {
//     dispatch({ type: CREATE_TASK_REQUEST });

//     try{
//         const { data } = await axios.post("http://localhost:9000/tasks", newTask);
//         dispatch({ type: CREATE_TASK_SUCCESS, payload: data });

//     }catch(error){
//         dispatch({ type: CREATE_TASK_FAILURE, payload: error });
//     }
// };

// export const deleteTask = (taskId) => async(dispatch, getState) => {
//     dispatch({ type: DELETE_TASK_REQUEST });

//     try {
//          await axios.delete(`http://localhost:9000/tasks/${taskId}`);
//          dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });

//     } catch (error) {
//       dispatch({ type: DELETE_TASK_FAILURE, payload: error });
//     }
// };

// Using redux-thunk

// export const fetchTasks = () => async (dispatch, getState) => {

//   dispatch({ type: FETCH_TASKS_REQUEST });

//   try {
//     const { data } = await axios.get("http://localhost:9000/tasks");
//     dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });

//   } catch (error) {
//     dispatch({ type: FETCH_TASKS_FAILURE, payload: error });
//   } 
// };