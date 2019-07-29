import React from "react"
import PropTypes from "prop-types"
import { Transition, Message, Icon } from "semantic-ui-react"

export function FormError(props) {
  const { error } = props

  return (
    <Transition visible={!!error} animation="fade down" duration={500}>
      <Message error={true}>
        <Icon name="attention" />
        {error}
      </Message>
    </Transition>
  )
}

FormError.propTypes = {
  error: PropTypes.string,
}

export default FormError
