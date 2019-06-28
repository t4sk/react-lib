const SAVE = "AUTH/SAVE"
const REMOVE = "AUTH/REMOVE"

const INITIAL_STATE = {
  token: "",
  user: undefined,
}

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SAVE: {
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
  saveAuth: ({ token, user }) => ({ type: SAVE, token, user }),
  removeAuth: () => ({ type: REMOVE }),
}

export const selectors = {
  isAuthenticated: state => !!state.token,
}
