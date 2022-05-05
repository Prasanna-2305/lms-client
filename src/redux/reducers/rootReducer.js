import { combineReducers } from "redux";
import loginReducer from "./reducer";
import {courseReducer, commentReducer } from "./courseReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  course: courseReducer,
  comments: commentReducer,
  users:userReducer,
});

export default rootReducer;