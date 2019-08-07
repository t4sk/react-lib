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
    name = "fetch",
    getFetchId = (name, params) => name,
    getParams = props => ({}),
    shouldFetchFromCache = (props, response, params) => false,
    saveCache = (props, response, params) => {},
    debounce = 0,
  } = {}
) {
  return Component => {
    function WithFetch(props) {
      const {
        fetching,
        error,
        response,
        fetchStart,
        fetchSuccess,
        fetchFail,
        ...rest
      } = props

      const params = getParams(props)
      const fetchId = getFetchId(name, params)
      const paramId = useDebounce(JSON.stringify(params), debounce)

      async function fetch() {
        if (shouldFetchFromCache(props, response, params)) {
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
              params,
            },
          }}
        />
      )
    }

    WithFetch.propTypes = {
      fetching: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      response: PropTypes.any,
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
    )(WithFetch)
  }
}
