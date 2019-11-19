import { parse, validate, notEmpty, isInteger } from "./form"

describe("notEmpty", () => {
  test("valid", () => {
    expect(notEmpty("123")).toEqual(true)
  })

  test("invalid", () => {
    expect(isInteger("   ")).toEqual(false)
  })
})

describe("isInteger", () => {
  test("valid", () => {
    expect(isInteger("123")).toEqual(true)
  })

  test("invalid", () => {
    expect(isInteger("123.123")).toEqual(false)
    expect(isInteger(NaN)).toEqual(false)
  })
})

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
