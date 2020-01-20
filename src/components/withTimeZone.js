import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { actions } from "../reducer"

// TODO time zone context?

export default function withTimeZone(Component) {
  function TimeZone(props) {
    const { set, ...rest } = props

    function getTimeZone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    }

    function setTimeZone(timeZone) {
      set(timeZone)
    }

    return (
      <Component
        {...rest}
        setTimeZone={setTimeZone}
        getTimeZone={getTimeZone}
      />
    )
  }

  TimeZone.propTypes = {
    timeZone: PropTypes.string.isRequired,
    set: PropTypes.func.isRequired,
  }

  return connect(
    state => ({
      timeZone: state.timeZone,
    }),
    actions.timeZone
  )(TimeZone)
}
