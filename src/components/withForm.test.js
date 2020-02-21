import React from "react"
import { shallow } from "enzyme"
import withForm, { parse, validate } from "./withForm"

function notEmpty(str) {
  return !!str.trim()
}

function isInteger(x) {
  const int = parseInt(x)

  return !isNaN(int) && int.toString() === x.toString()
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
        {
          // test validation from other inputs
          validate: (val, values) => {
            if (values.str2 === "test") {
              return val === "abc"
            }
            return true
          },
          getErrorMessage: value => "str should equal abc when str2 equal test",
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
    // input to test default parser and no validation
    val: {
      parse: val => val,
    },
  },
  form: {
    validations: [
      {
        validate: values => values.str === values.str2,
        getInputErrorMessages: values => ({
          str: "not equal to str2",
          str2: "not equal to str",
        }),
        getErrorMessage: values => "str != str2",
      },
      // validation with props
      {
        validate: (values, props) => values.str === props.foo,
        getErrorMessage: values => `Not equal to props`,
      },
    ],
  },
}

const INPUTS = {
  str: "  abc  ",
  str2: "abc",
  num: "1",
  val: "123",
}

const PROPS = {
  foo: "abc",
}

test("parse", () => {
  expect(parse(SCHEMA, INPUTS)).toEqual({
    str: "abc",
    str2: "abc",
    num: 1,
    val: "123",
  })
})

describe("validate", () => {
  const inputs = parse(SCHEMA, INPUTS)

  test("valid", () => {
    expect(validate(SCHEMA, inputs, PROPS)).toEqual({})
  })

  test("invalid inputs", () => {
    expect(
      validate(
        SCHEMA,
        {
          ...inputs,
          str: "   ",
        },
        PROPS
      )
    ).toEqual({
      str: "Cannot be blank",
    })

    expect(
      validate(
        SCHEMA,
        {
          ...inputs,
          str: "123",
          str2: "test",
        },
        PROPS
      )
    ).toEqual({
      str: "str should equal abc when str2 equal test",
    })

    expect(
      validate(
        SCHEMA,
        {
          ...inputs,
          num: "",
        },
        PROPS
      )
    ).toEqual({
      num: "Invalid number",
    })

    expect(
      validate(
        SCHEMA,
        {
          ...inputs,
          num: "0",
        },
        PROPS
      )
    ).toEqual({
      num: "Must be greater than 0",
    })
  })

  test("invalid form", () => {
    expect(
      validate(
        SCHEMA,
        {
          ...inputs,
          str2: "foo",
        },
        PROPS
      )
    ).toEqual({
      form: ["str != str2"],
      str: "not equal to str2",
      str2: "not equal to str",
    })
  })

  test("validate form with props", () => {
    expect(validate(SCHEMA, inputs, { ...PROPS, foo: "bar" })).toEqual({
      form: ["Not equal to props"],
    })
  })
})

const TestComponent = props => null

const props = {
  submitting: false,
  error: "",
  onSubmit: jest.fn(),
  ...PROPS,
}

beforeEach(() => {
  props.onSubmit.mockClear()
})

test("it renders", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
    val: 1,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component).toMatchSnapshot()
})

test("get initial state", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "foo",
    str2: "bar",
    num: 123,
    val: 1,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component.props().inputs).toEqual({
    str: "foo",
    str2: "bar",
    num: 123,
    val: 1,
  })
})

test("valid", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
    val: 1,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  expect(component.props().valid).toEqual(true)
})

test("on change", () => {
  const WithForm = withForm(SCHEMA, props => ({
    str: "",
    str2: "",
    num: 123,
    val: 1,
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
    val: 1,
  }))(TestComponent)

  const component = shallow(<WithForm {...props} />)

  component.simulate("error", "str", "error")

  expect(component.props().errors.str).toEqual("error")
})
