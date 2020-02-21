import React from "react"
import { shallow } from "enzyme"
import { ErrorMessages } from "./ErrorMessages"

const props = {
  errors: [],
}

test("no error", () => {
  const component = shallow(<ErrorMessages {...props} />)

  expect(component).toMatchSnapshot()
})

test("1 error", () => {
  const component = shallow(<ErrorMessages {...props} errors={["error"]} />)

  expect(component).toMatchSnapshot()
})

test("many error", () => {
  const component = shallow(
    <ErrorMessages {...props} errors={["error 1", "error 2"]} />
  )

  expect(component).toMatchSnapshot()
})
