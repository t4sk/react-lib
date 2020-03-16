import React, { useRef, useReducer, useEffect } from "react"

const SEND = "REQUEST/SEND"
const SUCCESS = "REQUEST/SUCCESS"
const ERROR = "REQUEST/ERROR"
const RESET = "REQUEST/RESET"

export const actions = {
  onSend: () => ({ type: SEND }),
  onSuccess: response => ({ type: SUCCESS, response }),
  onError: error => ({ type: ERROR, error }),
  reset: () => ({ type: RESET }),
}

const INITIAL_STATE = {
  pending: false,
  error: "",
  response: undefined,
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND: {
      return {
        ...state,
        pending: true,
        error: "",
        response: undefined,
      }
    }
    case SUCCESS: {
      const { response } = action

      return {
        ...state,
        pending: false,
        response,
      }
    }
    case ERROR: {
      const { error } = action

      return {
        ...state,
        pending: false,
        error,
      }
    }
    case RESET:
      return INITIAL_STATE
    default:
      return state
  }
}

export default function withAsyncRequest(request, settings = {}) {
  const { name = "request", getInitialState = props => ({}) } = settings

  return Component => {
    function AsyncRequest(props) {
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

      async function send(...params) {
        _dispatch(actions.onSend())

        try {
          const response = await request(...params)

          _dispatch(actions.onSuccess(response))

          return { response }
        } catch (error) {
          _dispatch(actions.onError(error.message))

          return { error: error.message }
        }
      }

      function reset() {
        _dispatch(actions.reset())
      }

      return (
        <Component
          {...props}
          {...{
            [name]: {
              ...state,
              send,
              reset,
            },
          }}
        />
      )
    }

    return AsyncRequest
  }
}
