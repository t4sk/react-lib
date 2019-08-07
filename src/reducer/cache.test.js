import { reducer, actions, selectors } from "./cache"

describe("reducer", () => {
  test("set", () => {
    const key = "foo"

    const action = actions.updateCache({
      key,
      update: _ => 1,
    })

    expect(reducer(undefined, action)).toEqual({
      [key]: 1,
    })
  })
})

describe("selectors", () => {
  test("getMapValue", () => {
    const action = actions.updateCache({
      key: "foo",
      update: _ => 1,
    })
    const state = reducer(undefined, action)

    expect(selectors.getCache(state, "foo")).toEqual(1)
  })
})
