const FETCH_START = "FETCH_START"
const FETCH_SUCCESS = "FETCH_SUCCESS"
const FETCH_FAIL = "FETCH_FAIL"

const initialState = {
  fetching: false,
  error: "",
  response: undefined,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        fetching: true,
        error: "",
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        response: action.response,
      }
    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const actions = {
  start: () => ({ type: FETCH_START }),
  success: response => ({
    type: FETCH_SUCCESS,
    response,
  }),
  fail: error => ({ type: FETCH_FAIL, error }),
}
