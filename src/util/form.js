export function isEmpty(str) {
  if (!str.trim()) {
    return "Cannot be blank"
  }
}

export function isInt(str, opts = {}) {
  const { min = -Infinity, max = Infinity } = opts

  const int = parseInt(str)

  if (isNaN(int) || int.toString() != str.trim()) {
    return "Invalid number"
  }
  if (int < min) {
    return `Must be greater than or equal to ${min}`
  }
  if (int > max) {
    return `Must be less than or equal to ${max}`
  }
}
