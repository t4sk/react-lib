import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

export function DateFormat(props) {
  const { format, date } = props

  return moment(date).format(format)
}

DateFormat.defaultProps = {
  format: "YYYY-MM-DD HH:mm:ss",
}

DateFormat.propTypes = {
  format: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default DateFormat
