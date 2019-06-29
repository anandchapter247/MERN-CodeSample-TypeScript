import { Store, createStore, applyMiddleware, Action } from "redux";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";
import { IRootState } from "../interfaces";
import logger from "redux-logger";
import { RootReducer } from "../reducers";

export default function configureStore(
  history: History,
  initialState?: IRootState
): Store<IRootState> {
  const middlewares: any[] = [routerMiddleware(history)];
  const isProd: boolean = process.env.NODE_ENV === "production";
  if (!isProd) {
    middlewares.push(logger);
  }
  const middleware: any = applyMiddleware(...middlewares);

  const store: Store<any, Action> = createStore(
    RootReducer as any,
    initialState as any,
    middleware
  ) as Store<IRootState>;

  return store;
}
export function omit<T extends object, K extends keyof T>(
  target: T,
  ...omitKeys: K[]
): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res: any, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as Omit<T, K>
  );
}
