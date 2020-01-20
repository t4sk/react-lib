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

export function diff(newData, oldData) {
  const updates = {}

  for (const key of Object.keys(oldData)) {
    if (newData[key] != oldData[key]) {
      updates[key] = newData[key]
    }
  }

  return updates
}

export function getUnixTimeStamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000)
}

export function timeout(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// transducer
export function append(arr, x) {
  arr.push(x)
  return arr
}

export function map(f) {
  return combine => (res, x) => combine(res, f(x))
}

export function filter(f) {
  return combine => (res, x) => {
    if (f(x)) {
      return combine(res, x)
    }

    return res
  }
}

export function transduce(transform, combine, init, coll) {
  return coll.reduce(transform(combine), init)
}
