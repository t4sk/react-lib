import React, { useState } from "react"

export default function withParams(initialParams = {}) {
  return Component => {
    function WithParams(props) {
      const [params, setParams] = useState(initialParams)

      function onChangeParams(newParams) {
        setParams({
          ...params,
          ...newParams,
        })
      }

      return (
        <Component {...props} params={params} onChangeParams={onChangeParams} />
      )
    }

    return WithParams
  }
}
