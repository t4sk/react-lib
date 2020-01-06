import React from "react"
import { shallow } from "enzyme"
import withForm, { parse, validate } from "./withForm"

function notEmpty(str) {
  return !!str.trim()
}

function isInteger(x) {
  const int = parseInt(x)

  return !isNaN(int) && int.toString() == x.toString()
}

const SCHEMA = {
  inputs: {
    str: {
      parse: val => val.trim(),
      validations: [
        {
          validate: notEmpty,
          getErrorMessage: value => "Cannot be blank",
        },
      ],
    },
    str2: {
      parse: val => val.trim(),
      validations: [
        {
          validate: notEmpty,
          getErrorMessage: value => "Cannot be blank",
        },
      ],
    },
    num: {
      parse: parseInt,
      validations: [
        {
          validate: isInteger,
          getErrorMessage: value => "Invalid number",
        },
        {
          validate: value => value > 0,
          getErrorMessage: value => "Must be greater than 0",
        },
      ],
    },
  },
  form: {
    validations: [
      {
        validate: values => values.str == values.str2,
        getErrorMessage: values => `Not equal`,
      },
    ],
  },
}

const INPUTS = {
  str: "  abc  ",
  str2: "abc",
  num: "1",
}

test("parse", () => {
  expect(parse(SCHEMA, INPUTS)).toEqual({
    str: "abc",
    str2: "abc",
    num: 1,
  })
})

describe("validate", () => {
  const inputs = parse(SCHEMA, INPUTS)

  test("valid", () => {
    expect(validate(SCHEMA, inputs)).toEqual({})
  })

  test("invalid inputs", () => {
    expect(
      validate(SCHEMA, {
        ...inputs,
        str: "   ",
      })
    ).toEqual({
      str: "Cannot be blank",
    })

    expect(
      validate(SCHEMA, {
        ...inputs,
        num: "",
      })
    ).toEqual({
      num: "Invalid number",
    })

    expect(
      validate(SCHEMA, {
        ...inputs,
        num: "0",
      })
    ).toEqual({
      num: "Must be greater than 0",
    })
  })

  test("invalid form", () => {
    expect(
      validate(SCHEMA, {
        ...inputs,
        str2: "foo",
      })
    ).toEqual({
      form: ["Not equal"],
    })
  })
})

const TestComponent = props => null

const props = {
  submitting: false,
  error: "",
  onSubmit: jest.fn(),
}

beforeEach(() => {
  props.onSubmit.mockClear()
})

test("it renders", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component).toMatchSnapshot()
})

test("get initial state", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "foo",
    str2: "bar",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component.props().inputs).toEqual({
    str: "foo",
    str2: "bar",
    num: 123,
  })
})

test("valid", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component.props().valid).toEqual(true)
})

test("invalid", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} error="error" />)

  expect(component.props().valid).toEqual(false)
})

test("on change", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  component.simulate("change", "str", "foo")

  expect(component.props().inputs.str).toEqual("foo")
})

test("on error", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  component.simulate("error", "str", "error")

  expect(component.props().errors.str).toEqual("error")
})

describe("on submit", () => {
  let component

  beforeEach(() => {
    const WithForm = withForm(SCHEMA, props => ({
      str: "",
      str2: "",
      num: 123,
    }))(TestComponent)

    component = shallow(<WithForm {...props} />)
  })

  test("submitting", () => {
    const WithForm = withForm(SCHEMA, props => ({
      str: "",
      str2: "",
      num: 123,
    }))(TestComponent)

    component = shallow(<WithForm {...props} submitting={true} />)

    component.simulate("submit")

    expect(props.onSubmit.mock.calls.length).toEqual(0)
  })

  test("valid", () => {
    component.simulate("change", "str", "foo")
    component.simulate("change", "str2", "foo")
    component.simulate("change", "num", 456)

    component.simulate("submit")

    expect(props.onSubmit.mock.calls.length).toEqual(1)
    expect(props.onSubmit.mock.calls[0][0]).toEqual({
      str: "foo",
      str2: "foo",
      num: 456,
    })
    expect(component.props().valid).toEqual(true)
    expect(component.props().errors).toEqual({})
  })

  test("invalid", () => {
    component.simulate("submit")

    expect(props.onSubmit.mock.calls.length).toEqual(0)
    expect(component.props().valid).toEqual(false)
    expect(component.props().errors).toBeDefined()
  })
})
