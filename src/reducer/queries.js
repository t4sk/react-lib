import * as fetch from "./fetch"

const START = "QUERIES/START"
const SUCCESS = "QUERIES/SUCCESS"
const FAIL = "QUERIES/FAIL"

export const actions = {
  start: queryId => ({ type: START, queryId }),
  success: ({ queryId, response }) => ({
    type: SUCCESS,
    queryId,
    response,
  }),
  fail: ({ queryId, error }) => ({
    type: FAIL,
    queryId,
    error,
  }),
}

const INITIAL_FETCH_STATE = fetch.reducer(undefined, {})

function getFetchState(state, queryId) {
  return state[queryId] || INITIAL_FETCH_STATE
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case START: {
      const { queryId } = action

      return {
        ...state,
        [queryId]: fetch.reducer(
          getFetchState(state, queryId),
          fetch.actions.start()
        ),
      }
    }
    case SUCCESS: {
      const { queryId, response } = action

      return {
        ...state,
        [queryId]: fetch.reducer(
          getFetchState(state, queryId),
          fetch.actions.success(response)
        ),
      }
    }
    case FAIL: {
      const { queryId, error } = action

      return {
        ...state,
        [queryId]: fetch.reducer(
          getFetchState(state, queryId),
          fetch.actions.fail(error)
        ),
      }
    }
    default:
      return state
  }
}

export const selectors = {
  get: (state, queryId) => getFetchState(state, queryId),
}
