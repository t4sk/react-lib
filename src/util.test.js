import { compose, get, getUnixTimeStamp } from "./util"

test("compose", () => {
  expect(
    compose(
      x => x + 1,
      x => x * 2
    )(1)
  ).toEqual(3)
})

describe("get", () => {
  test("get", () => {
    expect(get({ a: { b: [1, 2] } }, ["a", "b", 0])).toEqual(1)
  })

  test("default", () => {
    expect(get({}, ["a", "b", 0], 1)).toEqual(1)
  })
})

test("get unix time stamp", () => {
  const date = new Date()
  const now = Math.floor(date.getTime() / 1000)

  expect(getUnixTimeStamp(date)).toEqual(now)
  // test now
  expect(getUnixTimeStamp()).toBeGreaterThanOrEqual(now)
  expect(getUnixTimeStamp()).toBeLessThanOrEqual(now + 1)
})
