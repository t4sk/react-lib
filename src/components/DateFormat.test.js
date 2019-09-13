import React from "react"
import { shallow } from "enzyme"
import { DateFormat } from "./DateFormat"

const props = {
  date: "2019-07-31T03:08:44.033Z",
  timeZone: "Asia/Tokyo",
}

test("it renders", () => {
  const component = shallow(<DateFormat {...props} />)

  expect(component).toMatchSnapshot()
})
