import { notEmpty, isInteger } from "./form"

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
