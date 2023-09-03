import {
  fetchTasksWorkerSaga,
  createTaskWorkerSaga,
  deleteTaskWorkerSaga,
} from "./tasks";
import {
  takeEvery,
  takeLatest,
  debounce,
  throttle,
  take,
  fork,
  all,
  cancel, 
  put
} from "redux-saga/effects";
import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  FETCH_TASKS_CANCEL,
  FETCH_TASKS_FAILURE,
} from "../redux/constants/action-types";


//Cancelling example with cancel effect

// export const fetchTasksWatcherSaga = function* () {
//   while (yield take(FETCH_TASKS)) {
//    const fetchProcess = yield fork(fetchTasksWorkerSaga);

//    yield take(FETCH_TASKS_CANCEL);
//    yield cancel(fetchProcess);
//    yield put({ type: FETCH_TASKS_FAILURE, payload: { message: "Cancelled" }});
//   }
// };

export const tasksWatcherSaga = function* () {
  //yield fork(fetchTasksWatcherSaga); 
  yield takeLatest(FETCH_TASKS, fetchTasksWorkerSaga);
  yield debounce(1000, CREATE_TASK, createTaskWorkerSaga);
  yield take(CREATE_TASK);
  //yield throttle(1000 * 30, CREATE_TASK, createTaskWorkerSaga);
  yield takeEvery(DELETE_TASK, deleteTaskWorkerSaga);
};

export const employeesWatcherSaga = function* () {};

export const rootSaga = function* () {
  const watcherSagas = [
    yield fork(tasksWatcherSaga),
    yield fork(employeesWatcherSaga),
  ];
  yield all(watcherSagas);
  //   yield fork(tasksWatcherSaga);
  //   yield fork(employeesWatcherSaga);
};
