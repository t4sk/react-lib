import * as fetch from "./fetch"

const START = "QUERIES/START"
const SUCCESS = "QUERIES/SUCCESS"
const FAIL = "QUERIES/FAIL"

export const actions = {
  queryStart: queryId => ({ type: START, queryId }),
  querySuccess: ({ queryId, response }) => ({
    type: SUCCESS,
    queryId,
    response,
  }),
  queryFail: ({ queryId, error }) => ({
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
          fetch.actions.fetchStart()
        ),
      }
    }
    case SUCCESS: {
      const { queryId, response } = action

      return {
        ...state,
        [queryId]: fetch.reducer(
          getFetchState(state, queryId),
          fetch.actions.fetchSuccess(response)
        ),
      }
    }
    case FAIL: {
      const { queryId, error } = action

      return {
        ...state,
        [queryId]: fetch.reducer(
          getFetchState(state, queryId),
          fetch.actions.fetchFail(error)
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
