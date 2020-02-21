import React from "react"
import { shallow } from "enzyme"
import { Clickable } from "./index"

const props = {
  onClick: jest.fn(),
}

const Children = <div>Click me</div>

test("it renders", () => {
  const component = shallow(
    <Clickable {...props}>
      <div>Click me</div>
    </Clickable>
  )

  expect(component).toMatchSnapshot()
})

test("onClick", () => {
  const component = shallow(
    <Clickable {...props}>
      <div>Click me</div>
    </Clickable>
  )

  component.find("button").simulate("click")

  expect(props.onClick.mock.calls.length).toEqual(1)
})
