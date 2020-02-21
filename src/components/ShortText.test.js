import React from "react"
import { shallow } from "enzyme"
import { ShortText } from "./ShortText"

const props = {
  text: "0x000000462a632b33612C857e2567B3a73aBf17Cb",
}

test("it renders", () => {
  const component = shallow(<ShortText {...props} />)

  expect(component).toMatchSnapshot()
})
