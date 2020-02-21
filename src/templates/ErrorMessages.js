import React from "react"
import PropTypes from "prop-types"
import { Transition, Message } from "semantic-ui-react"

export function ErrorMessages(props) {
  const { errors } = props

  return (
    <Transition
      visible={!!errors.length > 0}
      animation="fade down"
      duration={500}
    >
      {errors.length === 1 ? (
        <Message error={true}>{errors[0]}</Message>
      ) : (
        <Message error={true} list={errors} />
      )}
    </Transition>
  )
}

ErrorMessages.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ErrorMessages
