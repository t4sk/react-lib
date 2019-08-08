export function compose(...funcs) {
  return val =>
    funcs
      .slice()
      .reverse()
      .reduce((v, f) => {
        return f(v)
      }, val)
}

export function chunk(arr, size) {
  let chunks = []

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }

  return chunks
}

export function get(val, keys, defaultVal) {
  for (let key of keys) {
    if (val == undefined) {
      break
    }
    val = val[key]
  }

  if (val == undefined) {
    return defaultVal
  }

  return val
}
