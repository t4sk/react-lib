import React from "react"
import { shallow } from "enzyme"
import { LinkButton } from "./LinkButton"

const props = {
  onClick: jest.fn(),
}

test("it renders", () => {
  const component = shallow(<LinkButton {...props}>Click Me</LinkButton>)

  expect(component).toMatchSnapshot()
})
