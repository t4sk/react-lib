import React from "react"
import PropTypes from "prop-types"
import { Transition, Message, Icon } from "semantic-ui-react"

export function Errors(props) {
  const { errors } = props

  return (
    <Transition
      visible={!!errors.length > 0}
      animation="fade down"
      duration={500}
    >
      {errors.length > 1 ? (
        <Message error={true} list={[errors]} />
      ) : (
        <Message error={true}>{errors[0]}</Message>
      )}
    </Transition>
  )
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Errors
