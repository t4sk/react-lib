import React, { useRef, useReducer, useEffect } from "react"

const SUBSCRIBE = "SUBSCRIPTION/SUBSCRIBE"
const DATA = "SUBSCRIPTION/DATA"
const ERROR = "SUBSCRIPTION/ERROR"

export const actions = {
  onConnect: () => ({ type: SUBSCRIBE }),
  onData: data => ({ type: DATA, data }),
  onError: error => ({ type: ERROR, error }),
}

const INITIAL_STATE = {
  connecting: false,
  error: "",
  data: undefined,
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBSCRIBE: {
      return {
        ...state,
        connecting: true,
        error: "",
        data: undefined,
      }
    }
    case DATA: {
      const { data } = action

      return {
        ...state,
        connecting: false,
        data,
      }
    }
    case ERROR: {
      const { error } = action

      return {
        ...state,
        connecting: false,
        error,
      }
    }
    default:
      return state
  }
}

export default function withSubscription(
  subscribe,
  { name = "subscription", getInitialState = props => ({}) } = {}
) {
  return Component => {
    function Subscription(props) {
      const isMounted = useRef(true)
      const [state, dispatch] = useReducer(reducer, {
        ...INITIAL_STATE,
        ...getInitialState(props),
      })

      useEffect(() => {
        return () => {
          isMounted.current = false
        }
      }, [])

      function _dispatch(action) {
        if (!isMounted.current) {
          return
        }

        dispatch(action)
      }

      function _subscribe(...params) {
        const callback = params.pop()

        _dispatch(actions.onConnect())

        // NOTE: return unsubscribe
        return subscribe(...params, (error, data) => {
          if (error) {
            _dispatch(actions.onError(error.message))
            callback(error)
            return
          }

          _dispatch(actions.onData(data))
          callback(null, data)
        })
      }

      return (
        <Component
          {...props}
          {...{
            [name]: {
              ...state,
              subscribe: _subscribe,
            },
          }}
        />
      )
    }

    return Subscription
  }
}
