import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions, selectors } from "../reducer"

export default function useQuery(
  request,
  {
    name = "query",
    getQueryId = props => 1,
    getFromCache = props => false,
    byId = response => ({}),
    findFromId = props => ({}),
  } = {}
) {
  return Component => {
    function Query(props) {
      const { start, success, fail, state, fromId, ...rest } = props

      const queryId = getQueryId(props)

      async function fetch() {
        if (state.response && getFromCache(state, props)) {
          return
        }

        if (fromId) {
          success({ name, queryId, response: fromId, byId: byId(fromId) })
          return
        }

        start({ name, queryId })

        try {
          const response = await request(props)

          success({ name, queryId, response, byId: byId(response) })
        } catch (error) {
          fail({ name, queryId, error })
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
              ...state,
              fetch,
            },
          }}
        />
      )
    }

    Query.propTypes = {
      start: PropTypes.func.isRequired,
      success: PropTypes.func.isRequired,
      fail: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }

    return connect(
      (state, props) => ({
        state: selectors.queries.get(state.queries, name, getQueryId(props)),
        fromId: selectors.queries.getById(state.queries, findFromId(props)),
      }),
      actions.queries
    )(Query)
  }
}
