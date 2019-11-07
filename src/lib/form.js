export function notEmpty(str) {
  return !!str.trim()
}

export function isInteger(x) {
  const int = parseInt(x)

  return !isNaN(int) && int.toString() == x.toString()
}

export function parse(schema, inputs) {
  return Object.entries(inputs).reduce((_inputs, [key, val]) => {
    _inputs[key] = schema[key].parse(val)

    return _inputs
  }, {})
}

export function validate(schema, inputs) {
  return Object.entries(schema).reduce((errors, [key, field]) => {
    const val = inputs[key]

    const _errors = field.validations
      .map(({ validate, getErrorMessage }) => {
        if (validate(val)) {
          return
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
}
