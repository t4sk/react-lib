import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions, selectors } from "../reducer"

export default function useCache(Component) {
  return connect(
    state => ({ cache: state.cache }),
    actions.cache
  )(Component)
}
