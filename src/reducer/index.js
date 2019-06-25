import { combineReducers } from "redux"
import * as auth from "./auth"
import * as queries from "./queries"
import * as data from "./data"

export const reducer = combineReducers({
  auth: auth.reducer,
  queries: queries.reducer,
  data: data.reducer,
})

export const actions = {
  auth: auth.actions,
  queries: queries.actions,
  data: data.actions,
}

export const selectors = {
  auth: auth.selectors,
  queries: queries.selectors,
  data: data.selectors,
}
