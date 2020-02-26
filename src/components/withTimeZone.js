import React, { useReducer, createContext } from "react"

const SET = "TIME_ZONE/SET"
const RESET = "TIME_ZONE/RESET"

export const actions = {
  set: timeZone => ({ type: SET, timeZone }),
  reset: () => ({ type: RESET }),
}

const INITIAL_STATE = Intl.DateTimeFormat().resolvedOptions().timeZone

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET:
      return action.timeZone
    case RESET:
      return INITIAL_STATE
    default:
      return state
  }
}

const TimeZoneContext = createContext()

export function TimeZoneContextProvider(props) {
  const { children } = props

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  function set(auth) {
    dispatch(actions.set(auth))
  }

  function reset(auth) {
    dispatch(actions.reset(auth))
  }

  const value = { state, set, reset }

  return (
    <TimeZoneContext.Provider value={value}>
      {children}
    </TimeZoneContext.Provider>
  )
}

export default function withTimeZone(Component) {
  function TimeZone(props) {
    return (
      <TimeZoneContext.Consumer>
        {value => <Component {...props} timeZone={value} />}
      </TimeZoneContext.Consumer>
    )
  }

  return TimeZone
}
