import React from "react"
import { shallow } from "enzyme"
import { FormError } from "./FormError"

const props = {
  error: "error",
}

test("it renders", () => {
  const component = shallow(<FormError {...props} />)

  expect(component).toMatchSnapshot()
})

test("no error", () => {
  const component = shallow(<FormError {...props} error="" />)

  expect(component).toMatchSnapshot()
})
