import React from "react"
import { shallow } from "enzyme"
import { Template } from "./Template"

const props = {}

beforeEach(() => {})

test("it renders", () => {
  const component = shallow(<Template {...props} />)

  expect(component).toMatchSnapshot()
})
