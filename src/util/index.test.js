import {
  compose,
  chunk,
  get,
  diff,
  getUnixTimeStamp
  transduce,
  map,
  filter,
  append,
} from "./util"

test("compose", () => {
  expect(
    compose(
      x => x + 1,
      x => x * 2
    )(1)
  ).toEqual(3)
})

test("chunk", () => {
  expect(chunk([...new Array(13).keys()], 5)).toEqual([
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12],
  ])
})

describe("get", () => {
  test("get", () => {
    expect(get({ a: { b: [1, 2] } }, ["a", "b", 0])).toEqual(1)
  })

  test("default", () => {
    expect(get({}, ["a", "b", 0], 1)).toEqual(1)
  })
})

test("diff", () => {
  expect(diff({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({})

  expect(diff({ a: 2, b: 2 }, { a: 1, b: 2 })).toEqual({ a: 2 })

  expect(diff({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual({ c: undefined })
})

test("get unix time stamp", () => {
  const date = new Date()
  const now = Math.floor(date.getTime() / 1000)

  expect(getUnixTimeStamp(date)).toEqual(now)
  // test now
  expect(getUnixTimeStamp()).toBeGreaterThanOrEqual(now)
  expect(getUnixTimeStamp()).toBeLessThanOrEqual(now + 1)
})

describe("transduce", () => {
  const arr = [1, 2, 3, 4, 5]

  test("map to array", () => {
    const res = transduce(
      compose(
        map(x => x + 1),
        filter(x => x % 2 == 0)
      ),
      append,
      [],
      arr
    )

    expect(res).toEqual([2, 4, 6])
  })
  test("sum", () => {
    function add(sum, x) {
      return sum + x
    }

    const res = transduce(
      compose(
        map(x => x + 1),
        filter(x => x % 2 == 0)
      ),
      add,
      0,
      arr
    )

    expect(res).toEqual(12)
  })
})
