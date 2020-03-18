import React from "react"
import { shallow } from "enzyme"
import withAsyncRequest, { reducer, actions } from "./withAsyncRequest"

describe("reducer", () => {
  test("onSend", () => {
    expect(reducer(undefined, actions.onSend())).toEqual({
      sent: true,
      pending: true,
      error: "",
      response: undefined,
    })
  })

  test("onSuccess", () => {
    const state = reducer(undefined, actions.onSend())
    const response = {}

    expect(reducer(state, actions.onSuccess(response))).toEqual({
      sent: true,
      pending: false,
      error: "",
      response,
    })
  })

  test("onError", () => {
    const state = reducer(undefined, actions.onSend())
    const error = "Error"

    expect(reducer(state, actions.onError(error))).toEqual({
      sent: true,
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

function TestComponent(props) {
  return null
}

const props = { foo: "bar" }

test("it renders", () => {
  const Wrapped = withAsyncRequest(jest.fn(), {
    name: "testRequest",
  })(TestComponent)
  const component = shallow(<Wrapped {...props} />)

  expect(component.props()).toEqual(
    expect.objectContaining({
      testRequest: {
        sent: false,
        pending: false,
        error: "",
        response: undefined,
        send: expect.any(Function),
        reset: expect.any(Function),
      },
      ...props,
    })
  )
})

test("get initial state", () => {
  const Wrapped = withAsyncRequest(jest.fn(), {
    getInitialState: props => ({ pending: true }),
  })(TestComponent)
  const component = shallow(<Wrapped {...props} />)

  expect(component.props().request.pending).toEqual(true)
})

test("send success", async () => {
  const request = jest.fn()
  const response = {}
  request.mockResolvedValueOnce(response)

  const Wrapped = withAsyncRequest(request)(TestComponent)
  const component = shallow(<Wrapped {...props} />)

  const res = await component.props().request.send(1, 2, 3)

  expect(res).toEqual({ response })
  expect(request.mock.calls.length).toEqual(1)
  expect(request.mock.calls[0]).toEqual([1, 2, 3])
  expect(component.props().request.response).toEqual(response)
})

test("send error", async () => {
  const request = jest.fn()
  const error = { message: "error" }
  request.mockRejectedValueOnce(error)

  const Wrapped = withAsyncRequest(request)(TestComponent)
  const component = shallow(<Wrapped {...props} />)

  const res = await component.props().request.send(1, 2, 3)

  expect(res).toEqual({ error: error.message })
  expect(request.mock.calls.length).toEqual(1)
  expect(request.mock.calls[0]).toEqual([1, 2, 3])
  expect(component.props().request.error).toEqual(error.message)
})
