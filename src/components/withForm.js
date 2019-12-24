import React, { useState } from "react"
import PropTypes from "prop-types"
import * as form from "../lib/form"

export default function withForm(schema, getInitialInputs = props => ({})) {
  return Component => {
    function Form(props) {
      const { error, submitting } = props

      const [inputs, setInput] = useState(getInitialInputs(props))
      const [errors, setErrors] = useState({})

      function onChange(name, value) {
        setInput({
          ...inputs,
          [name]: value,
        })
      }

      function onError(name, error) {
        setErrors({
          ...errors,
          [name]: error,
        })
      }

      function onSubmit() {
        if (submitting) {
          return
        }

        setErrors({})

        const _inputs = form.parse(schema, inputs)
        const _errors = form.validate(schema, _inputs)

        if (Object.keys(_errors).length > 0) {
          setErrors(_errors)
          return
        }

        props.onSubmit(_inputs)
      }

      return (
        <Component
          inputs={inputs}
          errors={errors}
          valid={!error && Object.keys(errors).length == 0}
          onChange={onChange}
          onError={onError}
          {...props}
          onSubmit={onSubmit}
        />
      )
    }

    Form.propTypes = {
      submitting: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      onSubmit: PropTypes.func.isRequired,
    }

    return Form
  }
}
