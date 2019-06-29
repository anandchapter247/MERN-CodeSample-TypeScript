import { IRootState } from "./../interfaces";
import { Reducer, AnyAction, combineReducers } from "redux";
import { loginReducer } from "./Login";

export const RootReducer: Reducer<IRootState, AnyAction> = combineReducers<
  IRootState
>({
  loginReducer: loginReducer as any
});
