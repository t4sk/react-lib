import React from "react"
import { shallow } from "enzyme"
import { Loading } from "./Loading"

const children = <div>children</div>
const props = {
  loading: false,
  error: "",
  onClickRetry: jest.fn(),
}

test("it renders", () => {
  const component = shallow(<Loading {...props}>{children}</Loading>)

  expect(component).toMatchSnapshot()
})

test("loading", () => {
  const component = shallow(
    <Loading {...props} loading={true}>
      {children}
    </Loading>
  )

  expect(component).toMatchSnapshot()
})

test("error", () => {
  const component = shallow(
    <Loading {...props} error="Error">
      {children}
    </Loading>
  )

  expect(component).toMatchSnapshot()
})

test("renderLoading", () => {
  const renderLoading = () => <div>Custom loading message...</div>
  const component = shallow(
    <Loading {...props} error="Error" renderLoading={renderLoading}>
      {children}
    </Loading>
  )

  expect(component).toMatchSnapshot()
})

test("onClickRetry", () => {
  const component = shallow(
    <Loading {...props} error="Error">
      {children}
    </Loading>
  )

  component.find("Button").simulate("click")

  expect(props.onClickRetry.mock.calls.length).toEqual(1)
})
