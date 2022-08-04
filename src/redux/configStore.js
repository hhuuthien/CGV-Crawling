import { combineReducers, createStore } from "redux";
import { movieReducer } from "./movieReducer";

const rootReducer = combineReducers({
  movieReducer,
});

export const store = createStore(rootReducer);
