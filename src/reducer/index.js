import { combineReducers } from "redux"
import * as auth from "./auth"
import * as queries from "./queries"

export const reducer = combineReducers({
  queries: queries.reducer,
  auth: auth.reducer,
})

export const actions = {
  queries: queries.actions,
  auth: auth.actions,
}

export const selectors = {
  queries: queries.selectors,
  auth: auth.selectors,
}
