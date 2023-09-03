import { put, call, retry, race, take, select } from "redux-saga/effects";
import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_CANCEL,
} from "../redux/constants/action-types";
import { fetchTasks, createTask, deleteTask } from "../api/tasks";

// cancel effect example
// export const fetchTasksWorkerSaga = function* () {
//   yield put({ type: FETCH_TASKS_REQUEST });

//   try {
//     const { data } = yield call(fetchTasks);
//     yield put({ type: FETCH_TASKS_SUCCESS, payload: data });
//   } catch (error) {
//     yield put({ type: FETCH_TASKS_FAILURE, payload: error });
//   }
// };

export const fetchTasksWorkerSaga = function* () {
  yield select(state => console.log(state.tasks))

  yield put({ type: FETCH_TASKS_REQUEST });

  try {
    const { response, fetchCancel } = yield race({
      response: call(fetchTasks),
      fetchCancel: take(FETCH_TASKS_CANCEL),
    });

    if (fetchCancel) {
      yield put({
        type: FETCH_TASKS_FAILURE,
        payload: { message: "Cancelled" },
      });
    } else {
      yield put({ type: FETCH_TASKS_SUCCESS, payload: response.data });
    }
  } catch (error) {
    yield put({ type: FETCH_TASKS_FAILURE, payload: error });
  }
};

export const createTaskWorkerSaga = function* (action) {
  yield put({ type: CREATE_TASK_REQUEST });

  try {
    const { data } = yield retry(3, 3 * 1000, createTask, action.payload);
    yield put({ type: CREATE_TASK_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: CREATE_TASK_FAILURE, payload: error });
  }
};

export const deleteTaskWorkerSaga = function* (action) {
  yield put({ type: DELETE_TASK_REQUEST });

  try {
    yield call(deleteTask, action.payload);
    yield put({ type: DELETE_TASK_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_TASK_FAILURE, payload: error });
  }
};
