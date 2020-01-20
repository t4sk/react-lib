import { reducer, actions } from "./timeZone"

describe("reducer", () => {
  test("set time zone", () => {
    const action = actions.set("Africa/Lagos")

    expect(reducer(undefined, action)).toEqual("Africa/Lagos")
  })
})
