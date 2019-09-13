import PropTypes from "prop-types"
import moment from "moment-timezone"

const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm"

export function DateFormat(props) {
  const { date, timeZone, format = DEFAULT_FORMAT } = props

  return moment.tz(date, timeZone).format(format)
}

DateFormat.propTypes = {
  date: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  format: PropTypes.string,
}

export default DateFormat
