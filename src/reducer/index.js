import { combineReducers } from "redux"
import * as auth from "./auth"
import * as fetch from "./fetch"
import * as cache from "./cache"

export const reducer = combineReducers({
  auth: auth.reducer,
  fetch: fetch.reducer,
  cache: cache.reducer,
})

export const actions = {
  auth: auth.actions,
  fetch: fetch.actions,
  cache: cache.actions,
}

export const selectors = {
  auth: auth.selectors,
  fetch: fetch.selectors,
  cache: cache.selectors,
}
