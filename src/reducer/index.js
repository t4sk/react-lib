import { combineReducers } from "redux"
import * as auth from "./auth"
import * as queries from "./queries"
import * as cache from "./cache"

export const reducer = combineReducers({
  auth: auth.reducer,
  queries: queries.reducer,
  cache: cache.reducer,
})

export const actions = {
  auth: auth.actions,
  queries: queries.actions,
  cache: cache.actions,
}

export const selectors = {
  auth: auth.selectors,
  queries: queries.selectors,
  cache: cache.selectors,
}
