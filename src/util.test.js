import { compose, chunk, get } from "./util"

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
