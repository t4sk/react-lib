import React from "react"
import PropTypes from "prop-types"

export function ShortText(props) {
  const { width, text } = props

  return (
    <div
      style={{
        width: width,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  )
}

ShortText.propTypes = {
  width: PropTypes.number.isRequired,
  text: PropTypes.node.isRequired,
}

ShortText.defaultProps = {
  width: 100,
}

export default ShortText
