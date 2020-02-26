import { reducer, actions } from "./withTimeZone"

describe("reducer", () => {
  test("set", () => {
    const action = actions.set("Asia/Tokyo")

    expect(reducer(undefined, action)).toEqual("Asia/Tokyo")
  })

  test("reset", () => {
    const action = actions.reset()

    expect(reducer(undefined, action)).toEqual("Asia/Tokyo")
  })
})
