import React, { useState } from "react"

export default function withAsyncRequest(request, { name = "request" } = {}) {
  return Component => {
    function AsyncRequest(props) {
      const [state, setState] = useState({
        pending: false,
        sentAt: undefined,
        receivedAt: undefined,
        error: "",
        response: undefined,
      })

      async function send(...params) {
        const newState = {
          ...state,
          pending: true,
          sentAt: new Date(),
          error: "",
          receivedAt: undefined,
          response: undefined,
        }

        setState(newState)

        try {
          const response = await request(...params)

          setState({
            ...newState,
            pending: false,
            receivedAt: new Date(),
            response,
          })

          return { response }
        } catch (error) {
          setState({
            ...newState,
            pending: false,
            receivedAt: new Date(),
            error: error.message,
          })

          return { error: error.message }
        }
      }

      return (
        <Component
          {...props}
          {...{
            [name]: {
              ...state,
              send,
            },
          }}
        />
      )
    }

    return AsyncRequest
  }
}
