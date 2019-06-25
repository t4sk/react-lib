const START = "FETCH/START"
const SUCCESS = "FETCH/SUCCESS"
const FAIL = "FETCH/FAIL"

export const actions = {
  start: () => ({ type: START }),
  success: response => ({
    type: SUCCESS,
    response,
  }),
  fail: error => ({ type: FAIL, error }),
}

const initialState = {
  fetching: false,
  error: "",
  response: undefined,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true,
        error: "",
      }
    case SUCCESS:
      return {
        ...state,
        fetching: false,
        response: action.response,
      }
    case FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error,
      }
    default:
      return state
  }
}
