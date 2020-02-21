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
