import React, { useState } from "react"
// import PropTypes from "prop-types"

// TODO class to build schema

export function parse(schema, values) {
  return Object.entries(schema.inputs).reduce((_values, [key, input]) => {
    const { parse = val => val } = input

    _values[key] = parse(values[key])

    return _values
  }, {})
}

export function validate(schema, values, props) {
  // validate inputs
  const inputs = schema.inputs || {}

  const inputErrors = Object.entries(inputs).reduce((errors, [key, input]) => {
    const val = values[key]

    const { validations = [] } = input

    const _errors = validations
      .map(({ validate, getErrorMessage }) => {
        if (validate(val, values, props)) {
          return ""
        }
        return getErrorMessage(val)
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
    .map(
      ({
        validate,
        getErrorMessage = values => "",
        getInputErrorMessages = values => ({}),
      }) => {
        if (validate(values, props)) {
          return null
        }
        return {
          form: getErrorMessage(values, props),
          inputs: getInputErrorMessages(values, props),
        }
      }
    )
    .filter(error => !!error)

  if (formErrors.length > 0) {
    return formErrors.reduce(
      (errors, error) => {
        if (error.form) {
          errors.form.push(error.form)
        }

        return {
          ...error.inputs,
          form: errors.form,
        }
      },
      { form: [] }
    )
  }

  return {}
}

export default function withForm(schema, getInitialInputs = props => ({})) {
  return Component => {
    function Form(props) {
      const [inputs, setInputs] = useState(getInitialInputs(props))
      const [errors, setErrors] = useState({})

      function onChange(name, value) {
        setInputs({
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

      function reset() {
        setInputs(getInitialInputs(props))
        setErrors({})
      }

      function _validate() {
        setErrors({})

        const _inputs = parse(schema, inputs)
        const _errors = validate(schema, _inputs, props)

        if (Object.keys(_errors).length > 0) {
          setErrors(_errors)
          return { errors: _errors }
        }

        return { inputs: _inputs }
      }

      return (
        <Component
          inputs={inputs}
          errors={errors}
          valid={Object.keys(errors).length === 0}
          onChange={onChange}
          onError={onError}
          validate={_validate}
          reset={reset}
          {...props}
        />
      )
    }

    Form.propTypes = {}

    return Form
  }
}
