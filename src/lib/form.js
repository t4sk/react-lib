export function notEmpty(str) {
  return !!str.trim()
}

export function isInteger(x) {
  const int = parseInt(x)

  return !isNaN(int) && int.toString() == x.toString()
}

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
