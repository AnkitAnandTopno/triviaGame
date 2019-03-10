import { combineReducers } from "redux";
import trivia from "./trivia/reducer";
const allReducers = combineReducers({
  trivia
});
export default allReducers;
