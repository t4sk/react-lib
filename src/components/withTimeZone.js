import React, { createContext } from "react"

export const TimeZoneContext = createContext(
  Intl.DateTimeFormat().resolvedOptions().timeZone
)

export default function withTimeZone(Component) {
  function TimeZone(props) {
    return (
      <TimeZoneContext.Consumer>
        {timeZone => <Component {...props} timeZone={timeZone} />}
      </TimeZoneContext.Consumer>
    )
  }

  return TimeZone
}
