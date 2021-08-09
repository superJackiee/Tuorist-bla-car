// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import auth from "./auth";
import navbar from "./navbar";
import layout from "./layout";
import offer from "./offer";

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  offer,
});

export default rootReducer;
