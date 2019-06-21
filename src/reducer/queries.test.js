import { reducer, actions, selectors } from "./queries"

describe("reducer", () => {
  test("start", () => {
    const name = "foo"
    const queryId = "bar"

    const action = actions.start({ name, queryId })
    expect(reducer(undefined, action)).toEqual({
      [name]: {
        [queryId]: {
          fetching: true,
          response: undefined,
          error: "",
        },
        byId: {},
      },
    })
  })

  test("success", () => {
    const name = "foo"
    const queryId = "bar"
    const response = { data: 123 }
    const byId = { 123: {} }

    const action = actions.success({ name, queryId, response, byId })
    expect(reducer(undefined, action)).toEqual({
      [name]: {
        [queryId]: {
          fetching: false,
          response,
          error: "",
        },
        byId,
      },
    })
  })

  test("fail", () => {
    const name = "foo"
    const queryId = "bar"
    const error = "error"

    const action = actions.fail({ name, queryId, error })
    expect(reducer(undefined, action)).toEqual({
      [name]: {
        [queryId]: {
          fetching: false,
          response: undefined,
          error,
        },
      },
    })
  })
})

describe("selectors", () => {
  test("get", () => {
    const state = reducer(undefined, {})

    expect(selectors.get(state, "foo", "bar")).toEqual({
      fetching: false,
      response: undefined,
      error: "",
    })
  })

  describe("getById", () => {
    test("get by id", () => {
      const action = actions.success({
        name: "foo",
        queryId: "bar",
        response: {},
        byId: { 1: "data by id" },
      })

      const state = reducer(undefined, action)

      expect(selectors.getById(state, { name: "foo", id: 1 })).toEqual(
        "data by id"
      )
    })

    test("undefined", () => {
      const state = reducer(undefined, {})

      expect(selectors.getById(state, { name: "foo", id: 1 })).toEqual(
        undefined
      )
    })
  })
})
