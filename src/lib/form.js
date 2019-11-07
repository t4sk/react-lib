export function isInteger(x) {
  const int = parseInt(x)

  return !isNaN(int) && int.toString() == x.toString()
}
