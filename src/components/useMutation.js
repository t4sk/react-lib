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

        try {
          const response = await request(params)

          setState({
            ...state,
            saving: false,
          })

          return { response }
        } catch (error) {
          setState({
            ...state,
            saving: false,
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
              save,
            },
          }}
        />
      )
    }

    return Mutation
  }
}
