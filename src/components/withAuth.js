import React, { createContext, useReducer } from "react"

const SET = "AUTH/SET"
const UPDATE = "AUTH/UPDATE"
const REMOVE = "AUTH/REMOVE"

export const actions = {
  set: auth => ({
    type: SET,
    auth,
  }),
  update: auth => ({
    type: UPDATE,
    auth,
  }),
  remove: () => ({ type: REMOVE }),
}

const INITIAL_STATE = {}

export function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET: {
      const { auth } = action
      return auth
    }
    case UPDATE: {
      const { auth } = action
      return {
        ...state,
        ...auth,
      }
    }
    case REMOVE:
      return INITIAL_STATE
    default:
      return state
  }
}

const AuthContext = createContext()

export function AuthContextProvider(props) {
  const { children } = props

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  function set(auth) {
    dispatch(actions.set(auth))
  }

  function update(auth) {
    dispatch(actions.update(auth))
  }

  function remove() {
    dispatch(actions.remove())
  }

  const value = { state, set, update, remove }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function withAuth(Component) {
  function Auth(props) {
    return (
      <AuthContext.Consumer>
        {value => <Component {...props} auth={value} />}
      </AuthContext.Consumer>
    )
  }

  return Auth
}
