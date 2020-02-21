import React from "react"
import PropTypes from "prop-types"

export function TestBit(props) {
  const { foo } = props

  return <button>{foo}</button>
}

TestBit.propTypes = {
  foo: PropTypes.string.isRequired,
}

export default TestBit
