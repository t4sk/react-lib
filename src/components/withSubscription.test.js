import React from "react"
import { shallow } from "enzyme"
import withSubscription, { reducer, actions } from "./withSubscription"

describe("reducer", () => {
  test("onConnect", () => {
    expect(reducer(undefined, actions.onConnect())).toEqual({
      connecting: true,
      error: "",
      data: undefined,
    })
  })

  test("onData", () => {
    const state = reducer(undefined, actions.onConnect())
    const data = {}

    expect(reducer(state, actions.onData(data))).toEqual({
      connecting: false,
      error: "",
      data,
    })
  })

  test("onError", () => {
    const state = reducer(undefined, actions.onConnect())
    const error = "Error"

    expect(reducer(state, actions.onError(error))).toEqual({
      connecting: false,
      error,
      data: undefined,
    })
  })
})

function TestComponent(props) {
  return null
}

const props = { foo: "bar" }

test("it renders", () => {
  const Wrapped = withSubscription(jest.fn(), {
    name: "testSubscription",
  })(TestComponent)
  const component = shallow(<Wrapped {...props} />)

  expect(component.props()).toEqual(
    expect.objectContaining({
      testSubscription: {
        connecting: false,
        error: "",
        data: undefined,
        subscribe: expect.any(Function),
      },
      ...props,
    })
  )
})
