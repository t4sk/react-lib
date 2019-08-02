import { reducer, actions, selectors } from "./fetch"

describe("reducer", () => {
  test("start", () => {
    const fetchId = "foo"

    const action = actions.fetchStart({ fetchId })
    expect(reducer(undefined, action)).toEqual({
      [fetchId]: {
        fetching: true,
        error: "",
      },
    })
  })

  test("success", () => {
    const fetchId = "foo"
    const response = { foo: "bar" }

    const action = actions.fetchSuccess({ fetchId, response })
    expect(reducer(undefined, action)).toEqual({
      [fetchId]: {
        fetching: false,
        error: "",
        response,
      },
    })
  })

  test("fail", () => {
    const fetchId = "foo"
    const error = "error"

    const action = actions.fetchFail({ fetchId, error })
    expect(reducer(undefined, action)).toEqual({
      [fetchId]: {
        fetching: false,
        error,
      },
    })
  })
})

describe("selectors", () => {
  test("getFetchState", () => {
    const state = reducer(undefined, {})

    expect(selectors.getFetchState(state, "foo", "bar")).toEqual({
      fetching: false,
      error: "",
    })
  })
})
