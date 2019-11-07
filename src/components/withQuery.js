import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions, selectors } from "../reducer"

function useDebounce(val, delay) {
  const [debouncedVal, setDebouncedVal] = useState(val)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [val])

  return debouncedVal
}

export default function withFetch(
  request,
  {
    name = "query",
    getFetchId = (name, params) => name,
    getParams = props => ({}),
    shouldFetch = (props, response, params) => true,
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
        fetchedAt,
        respondedAt,
        fetchStart,
        fetchSuccess,
        fetchFail,
        ...rest
      } = props

      const params = getParams(props)
      const fetchId = getFetchId(name, params)
      const paramId = useDebounce(JSON.stringify(params), debounce)

      async function fetch() {
        if (!shouldFetch(props, response, params)) {
          return
        }

        if (fetching) {
          return
        }

        fetchStart({ fetchId })

        try {
          const response = await request(params, props)

          fetchSuccess({ fetchId, response })
          saveCache(props, response, params)
        } catch (error) {
          fetchFail({ fetchId, error: error.message })
        }
      }

      useEffect(() => {
        fetch()
      }, [paramId])

      return (
        <Component
          {...rest}
          {...{
            [name]: {
              fetching,
              error,
              fetch,
              response,
              fetchedAt,
              respondedAt,
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
      respondedAt: PropTypes.string.isRequired,
      fetchedAt: PropTypes.string.isRequired,
      fetchStart: PropTypes.func.isRequired,
      fetchSuccess: PropTypes.func.isRequired,
      fetchFail: PropTypes.func.isRequired,
    }

    return connect(
      (state, props) => {
        const params = getParams(props)
        const fetchId = getFetchId(name, params)

        return selectors.fetch.getFetchState(state.fetch, fetchId)
      },
      actions.fetch
    )(Query)
  }
}