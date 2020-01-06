import React, { useState } from "react"
import PropTypes from "prop-types"

export function parse(schema, values) {
  return Object.entries(schema.inputs).reduce((_values, [key, input]) => {
    _values[key] = input.parse(values[key])

    return _values
  }, {})
}

export function validate(schema, values) {
  // validate inputs
  const inputs = schema.inputs || {}

  const inputErrors = Object.entries(inputs).reduce((errors, [key, input]) => {
    const val = values[key]

    const _errors = input.validations
      .map(({ validate, getErrorMessage }) => {
        if (!validate(val)) {
          return getErrorMessage(val)
        }
      })
      .filter(error => !!error)

    if (_errors.length > 0) {
      // return only the first error
      errors[key] = _errors[0]
    }

    return errors
  }, {})

  if (Object.keys(inputErrors).length > 0) {
    return inputErrors
  }

  // validate form
  const form = schema.form || { validations: [] }

  const formErrors = form.validations
    .map(({ validate, getErrorMessage }) => {
      if (!validate(values)) {
        return getErrorMessage(values)
      }
    })
    .filter(error => !!error)

  if (formErrors.length > 0) {
    return { form: formErrors }
  }

  return {}
}

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

        const _inputs = parse(schema, inputs)
        const _errors = validate(schema, _inputs)

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
