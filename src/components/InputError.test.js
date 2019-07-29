import React from "react"
import { shallow } from "enzyme"
import { InputError } from "./InputError"

const props = {
  error: "error",
}

test("it renders", () => {
  const component = shallow(<InputError {...props} />)

  expect(component).toMatchSnapshot()
})

test("no error", () => {
  const component = shallow(<InputError {...props} error="" />)

  expect(component).toMatchSnapshot()
})
