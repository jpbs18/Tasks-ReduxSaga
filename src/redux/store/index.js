import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../../sagas";


const logger = createLogger({ collapsed: true });
const saga = createSagaMiddleware();
const middleWares = [reduxThunk, saga, logger]

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleWares)));

saga.run(rootSaga);
export default store;