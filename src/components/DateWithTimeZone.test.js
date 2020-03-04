import React from "react"
import { shallow } from "enzyme"
import { DateWithTimeZone } from "./DateWithTimeZone"

const props = {
  date: "2019-07-31T03:08:44.033Z",
  timeZone: { state: "Asia/Tokyo" },
}

test("it renders", () => {
  const component = shallow(<DateWithTimeZone {...props} />)

  expect(component).toMatchSnapshot()
})
