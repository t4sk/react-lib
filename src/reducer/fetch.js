const START = "FETCH/START"
const SUCCESS = "FETCH/SUCCESS"
const FAIL = "FETCH/FAIL"

export const actions = {
  fetchStart: ({ fetchId }) => ({ type: START, fetchId }),
  fetchSuccess: ({ fetchId, response }) => ({
    type: SUCCESS,
    fetchId,
    response,
  }),
  fetchFail: ({ fetchId, error }) => ({ type: FAIL, fetchId, error }),
}

const INITIAL_FETCH_STATE = {
  fetching: false,
  error: "",
  response: undefined,
  fetchedAt: "",
  respondedAt: "",
}

function getFetchState(state, fetchId) {
  return state[fetchId] || INITIAL_FETCH_STATE
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case START: {
      const { fetchId } = action

      return {
        ...state,
        [fetchId]: {
          ...getFetchState(state, fetchId),
          fetching: true,
          error: "",
        },
      }
    }
    case SUCCESS: {
      const { fetchId, response } = action

      const now = new Date().toISOString()

      return {
        ...state,
        [fetchId]: {
          ...getFetchState(state, fetchId),
          fetching: false,
          response,
          fetchedAt: now,
          respondedAt: now,
        },
      }
    }
    case FAIL: {
      const { fetchId, error } = action

      const now = new Date().toISOString()

      return {
        ...state,
        [fetchId]: {
          ...getFetchState(state, fetchId),
          fetching: false,
          error,
          fetchedAt: now,
        },
      }
    }
    default:
      return state
  }
}

export const selectors = {
  getFetchState: (state, fetchId) => state[fetchId] || INITIAL_FETCH_STATE,
}
