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
  str: {
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
}

const INPUTS = {
  str: "  abc ",
  num: "1",
}

test("parse", () => {
  expect(parse(SCHEMA, INPUTS)).toEqual({
    str: "abc",
    num: 1,
  })
})

describe("validate", () => {
  test("valid", () => {
    expect(validate(SCHEMA, INPUTS)).toEqual({})
  })

  test("invalid", () => {
    expect(
      validate(SCHEMA, {
        ...INPUTS,
        str: "   ",
      })
    ).toEqual({
      str: "Cannot be blank",
    })

    expect(
      validate(SCHEMA, {
        ...INPUTS,
        num: "",
      })
    ).toEqual({
      num: "Invalid number",
    })

    expect(
      validate(SCHEMA, {
        ...INPUTS,
        num: "0",
      })
    ).toEqual({
      num: "Must be greater than 0",
    })
  })
})
