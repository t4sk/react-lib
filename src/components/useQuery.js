import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions, selectors } from "../reducer"

function getQueryId(name, params) {
  return `${name}-${JSON.stringify(params)}`
}

export default function useQuery(
  request,
  {
    name = "query",
    getParams = props => ({}),
    getCache = (props, params) => undefined,
    saveCache = (props, response) => {},
  } = {}
) {
  return Component => {
    function Query(props) {
      const { fetching, error, response, start, success, fail, ...rest } = props

      const params = getParams(props)
      const queryId = getQueryId(name, params)

      async function fetch() {
        if (getCache(props, params)) {
          return
        }

        start(queryId)

        try {
          const response = await request(params, props)

          success({ queryId, response })
          saveCache(props, response)
        } catch (error) {
          fail({ queryId, error: error.message })
        }
      }

      useEffect(
        () => {
          fetch()
        },
        [queryId]
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
            },
          }}
        />
      )
    }

    Query.propTypes = {
      fetching: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      response: PropTypes.any,
      start: PropTypes.func.isRequired,
      success: PropTypes.func.isRequired,
      fail: PropTypes.func.isRequired,
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
