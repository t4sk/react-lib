export function compose(...funcs) {
  return val =>
    funcs
      .slice()
      .reverse()
      .reduce((v, f) => {
        return f(v)
      }, val)
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

export function getUnixTimeStamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000)
}

export function timeout(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
