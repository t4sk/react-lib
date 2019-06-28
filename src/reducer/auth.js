const SET = "AUTH/SET"
const REMOVE = "AUTH/REMOVE"

const INITIAL_STATE = {
  token: "",
  user: undefined,
}

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET: {
      const { token, user } = action

      return {
        token,
        user,
      }
    }
    case REMOVE:
      return INITIAL_STATE
    default:
      return state
  }
}

export const actions = {
  set: ({ token, user }) => ({ type: SET, token, user }),
  remove: () => ({ type: REMOVE }),
}

export const selectors = {
  isAuthenticated: state => !!state.token,
}
