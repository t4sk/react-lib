import React, { useState } from "react"

export default function useMutation(request, { name = "mutation" } = {}) {
  return Component => {
    function Mutation(props) {
      const [state, setState] = useState({
        saving: false,
        error: "",
      })

      async function save(params) {
        setState({
          ...state,
          saving: true,
          error: "",
        })

        const { response, error } = await request(params)

        if (error) {
          setState({
            ...state,
            saving: false,
            error: error,
          })

          return { error }
        }

        setState({
          ...state,
          saving: false,
        })

        return { response }
      }

      return (
        <Component
          {...props}
          {...{
            [name]: {
              ...state,
              save,
            },
          }}
        />
      )
    }

    return Mutation
  }
}
