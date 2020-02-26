import React from "react"
import { shallow } from "enzyme"
import { PaginationButtons } from "./PaginationButtons"

const props = {
  count: 100,
  skip: 40,
  limit: 20,
  onChangePage: jest.fn(),
}

beforeEach(() => {
  props.onChangePage.mockClear()
})

test("it renders", () => {
  const component = shallow(<PaginationButtons {...props} />)

  expect(component).toMatchSnapshot()
})

test("render first page", () => {
  const component = shallow(<PaginationButtons {...props} />)

  expect(component).toMatchSnapshot()
})

test("render last page", () => {
  const component = shallow(<PaginationButtons {...props} skip={80} />)

  expect(component).toMatchSnapshot()
})
test("on click first", () => {
  const component = shallow(<PaginationButtons {...props} />)

  component
    .find("Button")
    .first()
    .simulate("click")

  expect(props.onChangePage.mock.calls.length).toEqual(1)
  expect(props.onChangePage.mock.calls[0][0]).toEqual({
    page: 1,
    skip: 0,
  })
})

test("on click prev", () => {
  const component = shallow(<PaginationButtons {...props} />)

  component
    .find("Button")
    .at(1)
    .simulate("click")

  expect(props.onChangePage.mock.calls.length).toEqual(1)
  expect(props.onChangePage.mock.calls[0][0]).toEqual({
    page: 2,
    skip: props.limit,
  })
})

test("on click next", () => {
  const component = shallow(<PaginationButtons {...props} />)

  component
    .find("Button")
    .at(2)
    .simulate("click")

  expect(props.onChangePage.mock.calls.length).toEqual(1)
  expect(props.onChangePage.mock.calls[0][0]).toEqual({
    page: 4,
    skip: 3 * props.limit,
  })
})

test("on click last", () => {
  const component = shallow(<PaginationButtons {...props} />)

  component
    .find("Button")
    .last()
    .simulate("click")

  expect(props.onChangePage.mock.calls.length).toEqual(1)
  expect(props.onChangePage.mock.calls[0][0]).toEqual({
    page: 5,
    skip: 4 * props.limit,
  })
})
