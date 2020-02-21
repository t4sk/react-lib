import React, { useEffect } from "react"
import withAsyncRequest from "./withAsyncRequest"

export default function withFetch(request, settings = {}) {
  const { name = "fetch", getParams = props => ({}) } = settings

  return Component => {
    function Fetch(props) {
      const { req, ...rest } = props
      const { send, pending, error, response } = req

      function fetch() {
        send(getParams(props))
      }

      useEffect(() => {
        fetch()
      }, [])

      return (
        <Component
          {...rest}
          {...{
            [name]: {
              fetch,
              fetching: pending,
              error,
              response,
            },
          }}
        />
      )
    }

    return withAsyncRequest(request, {
      name: "req",
      getInitialState: () => ({
        pending: true,
      }),
    })(Fetch)
  }
}
