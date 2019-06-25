import { reducer, actions } from "./fetch"

describe("reducer", () => {
  test("fetch start", () => {
    const action = actions.start()

    expect(reducer(undefined, action)).toEqual({
      fetching: true,
      error: "",
      response: undefined,
    })
  })

  test("fetch success", () => {
    const response = { foo: "bar" }
    const action = actions.success(response)

    expect(reducer(undefined, action)).toEqual({
      fetching: false,
      error: "",
      response,
    })
  })

  test("fetch fail", () => {
    const error = "error"
    const action = actions.fail(error)

    expect(reducer(undefined, action)).toEqual(
      expect.objectContaining({
        fetching: false,
        error,
      })
    )
  })
})
