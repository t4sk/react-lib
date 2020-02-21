import React from "react"
import { shallow } from "enzyme"
import withFetch from "./withFetch"

function TestComponent(props) {
  return null
}

const props = { foo: "bar" }

test("it renders", () => {
  const Wrapped = withFetch(jest.fn(), {
    name: "testFetch",
  })(TestComponent)
  const component = shallow(<Wrapped {...props} />).dive()

  expect(component.props()).toEqual(
    expect.objectContaining({
      testFetch: {
        fetching: true,
        error: "",
        response: undefined,
        fetch: expect.any(Function),
      },
      ...props,
    })
  )
})
