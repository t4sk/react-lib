import * as fetch from "./fetch"

const QUERY_START = "QUERIES/QUERY_START"
const QUERY_SUCCESS = "QUERIES/QUERY_SUCCESS"
const QUERY_FAIL = "QUERIES/QUERY_FAIL"

export const actions = {
  start: ({ name, queryId }) => ({ type: QUERY_START, name, queryId }),
  success: ({ name, queryId, response, byId = {} }) => ({
    type: QUERY_SUCCESS,
    name,
    queryId,
    response,
    byId,
  }),
  fail: ({ name, queryId, error }) => ({
    type: QUERY_FAIL,
    name,
    queryId,
    error,
  }),
}

const initialFetchState = fetch.reducer(undefined, {})

function getFetchState(state, name, queryId) {
  return (state[name] || {})[queryId] || initialFetchState
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case QUERY_START: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          [action.queryId]: fetch.reducer(
            getFetchState(state, action.name, action.queryId),
            fetch.actions.start()
          ),
          byId: {},
        },
      }
    }
    case QUERY_SUCCESS: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          [action.queryId]: fetch.reducer(
            getFetchState(state, action.name, action.queryId),
            fetch.actions.success(action.response)
          ),
          byId: {
            ...(state[action.name] || {}).byId,
            ...action.byId,
          },
        },
      }
    }
    case QUERY_FAIL: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          [action.queryId]: fetch.reducer(
            getFetchState(state, action.name, action.queryId),
            fetch.actions.fail(action.error)
          ),
        },
      }
    }
    default:
      return state
  }
}

export const selectors = {
  get: (state, name, queryId) => getFetchState(state, name, queryId),
  getById: (state, { name, id }) => ((state[name] || {}).byId || {})[id],
}
