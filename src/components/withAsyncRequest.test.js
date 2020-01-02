import { reducer, actions } from "./withAsyncRequest"

describe("reducer", () => {
  test("onSend", () => {
    expect(reducer(undefined, actions.onSend())).toEqual({
      pending: true,
      error: "",
      response: undefined,
    })
  })

  test("onSuccess", () => {
    const state = reducer(undefined, actions.onSend())
    const response = {}

    expect(reducer(state, actions.onSuccess(response))).toEqual({
      pending: false,
      error: "",
      response,
    })
  })

  test("onError", () => {
    const state = reducer(undefined, actions.onSend())
    const error = "Error"

    expect(reducer(state, actions.onError(error))).toEqual({
      pending: false,
      error,
      response: undefined,
    })
  })

  test("reset", () => {
    const initialState = reducer(undefined, {})
    const state = reducer(initialState, actions.onSend())

    expect(reducer(state, actions.reset())).toEqual(initialState)
  })
})
