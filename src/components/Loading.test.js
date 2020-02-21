import React from "react"
import { shallow } from "enzyme"
import { Loading } from "./Loading"

const children = () => <div>children</div>
const props = {
  loading: false,
  error: "",
}

test("it renders", () => {
  const component = shallow(<Loading {...props}>{children}</Loading>)

  expect(component).toMatchSnapshot()
})

test("null", () => {
  const component = shallow(<Loading {...props}>{() => null}</Loading>)

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

test("render loading", () => {
  const renderLoading = () => <div>Custom loading message...</div>
  const component = shallow(
    <Loading {...props} error="Error" renderLoading={renderLoading}>
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

test("render error", () => {
  const renderError = props => <div>Custom {props.error} message...</div>
  const component = shallow(
    <Loading {...props} error="Error" renderError={renderError}>
      {children}
    </Loading>
  )

  expect(component).toMatchSnapshot()
})
