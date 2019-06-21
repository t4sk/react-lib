import React from "react"
import { shallow } from "enzyme"
import { DateFormat } from "./DateFormat"

const props = {
  date: new Date(0).toISOString(),
}

test("it renders", () => {
  const component = shallow(<DateFormat {...props} />)

  expect(component).toMatchSnapshot()
})
