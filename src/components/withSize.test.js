import { reducer, actions } from "./withSize"

describe("reducer", () => {
  test("update", () => {
    const width = 1000
    const height = 500
    const action = actions.update({ width, height })

    expect(reducer(undefined, action)).toEqual({
      width,
      height,
    })
  })
})
