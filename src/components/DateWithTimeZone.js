import React from "react"
import PropTypes from "prop-types"
import DateFormat from "./DateFormat"
import withTimeZone from "./withTimeZone"

export function DateWithTimeZone(props) {
  const { date, timeZone, ...rest } = props

  return <DateFormat date={date} timeZone={timeZone.state} {...rest} />
}

DateWithTimeZone.propTypes = {
  date: PropTypes.string.isRequired,
  timeZone: PropTypes.shape({
    state: PropTypes.string.isRequired,
  }).isRequired,
}

export default withTimeZone(DateWithTimeZone)
