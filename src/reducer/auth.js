const LOG_IN = "AUTH/LOG_IN"
const LOG_OUT = "AUTH/LOG_OUT"

const initialState = {
  token: "",
  user: undefined,
}

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.token,
        user: {
          ...state.user,
          ...action.user,
        },
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}

export const actions = {
  logIn: ({ token, user }) => ({ type: LOG_IN, token, user }),
  logOut: () => ({ type: LOG_OUT }),
}

export const selectors = {
  isAuthenticated: state => !!state.token,
}
