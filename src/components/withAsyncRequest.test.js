import { reducer, actions } from "./withAsyncRequest"

describe("reducer", () => {
  test("onSend", () => {
    expect(reducer(undefined, actions.onSend())).toEqual({
      pending: true,
      sent: true,
      error: "",
      received: false,
      response: undefined,
    })
  })

  test("onSuccess", () => {
    const state = reducer(undefined, actions.onSend())
    const response = {}

    expect(reducer(state, actions.onSuccess(response))).toEqual({
      pending: false,
      sent: true,
      error: "",
      received: true,
      response,
    })
  })

  test("onError", () => {
    const state = reducer(undefined, actions.onSend())
    const error = "Error"

    expect(reducer(state, actions.onError(error))).toEqual({
      pending: false,
      sent: true,
      error,
      received: true,
      response: undefined,
    })
  })

  test("reset", () => {
    const initialState = reducer(undefined, {})
    const state = reducer(initialState, actions.onSend())

    expect(reducer(state, actions.reset())).toEqual(initialState)
  })
})
