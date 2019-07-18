import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions, selectors } from "../reducer"

function useDebounce(val, delay) {
  const [debouncedVal, setDebouncedVal] = useState(val)

  useEffect(
    () => {
      const timer = setTimeout(() => {
        setDebouncedVal(val)
      }, delay)

      return () => {
        clearTimeout(timer)
      }
    },
    [val]
  )

  return debouncedVal
}

export default function withQuery(
  request,
  {
    name = "query",
    getQueryId = (name, params) => name,
    getParams = props => ({}),
    getCache = (props, response, params) => undefined,
    saveCache = (props, response, params) => {},
    debounce = 0,
  } = {}
) {
  return Component => {
    function Query(props) {
      const {
        fetching,
        error,
        response,
        queryStart,
        querySuccess,
        queryFail,
        ...rest
      } = props

      const params = getParams(props)
      const queryId = getQueryId(name, params)
      const paramId = useDebounce(JSON.stringify(params), debounce)

      async function fetch() {
        if (response && getCache(props, response, params)) {
          return
        }

        if (fetching) {
          return
        }

        queryStart(queryId)

        try {
          const response = await request(params, props)

          querySuccess({ queryId, response })
          saveCache(props, response, params)
        } catch (error) {
          queryFail({ queryId, error: error.message })
        }
      }

      useEffect(
        () => {
          fetch()
        },
        [paramId]
      )

      return (
        <Component
          {...rest}
          {...{
            [name]: {
              fetching,
              error,
              response,
              fetch,
              params,
            },
          }}
        />
      )
    }

    Query.propTypes = {
      fetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      response: PropTypes.any,
      queryStart: PropTypes.func.isRequired,
      querySuccess: PropTypes.func.isRequired,
      queryFail: PropTypes.func.isRequired,
    }

    return connect(
      (state, props) => {
        const params = getParams(props)
        const queryId = getQueryId(name, params)

        return selectors.queries.get(state.queries, queryId)
      },
      actions.queries
    )(Query)
  }
}
