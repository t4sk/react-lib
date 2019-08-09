import { reducer, actions, selectors } from "./fetch"

describe("reducer", () => {
  test("start", () => {
    const fetchId = "foo"

    const action = actions.fetchStart({ fetchId })
    expect(reducer(undefined, action)).toEqual({
      [fetchId]: {
        fetching: true,
        error: "",
        response: undefined,
        fetchedAt: "",
        respondedAt: "",
      },
    })
  })

  test("success", () => {
    const fetchId = "foo"
    const response = { foo: "bar" }

    const action = actions.fetchSuccess({ fetchId, response })
    expect(reducer(undefined, action)).toEqual(
      expect.objectContaining({
        [fetchId]: {
          fetching: false,
          error: "",
          response,
          fetchedAt: expect.any(String),
          respondedAt: expect.any(String),
        },
      })
    )
  })

  test("fail", () => {
    const fetchId = "foo"
    const error = "error"

    const action = actions.fetchFail({ fetchId, error })
    expect(reducer(undefined, action)).toEqual(
      expect.objectContaining({
        [fetchId]: {
          fetching: false,
          error,
          response: undefined,
          respondedAt: "",
          fetchedAt: expect.any(String),
        },
      })
    )
  })
})

describe("selectors", () => {
  test("getFetchState", () => {
    const state = reducer(undefined, {})

    expect(selectors.getFetchState(state, "foo", "bar")).toEqual({
      fetching: false,
      error: "",
      response: undefined,
      fetchedAt: "",
      respondedAt: "",
    })
  })
})
