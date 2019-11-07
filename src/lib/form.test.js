import { isInteger } from "./form"

describe("isInteger", () => {
  test("valid", () => {
    expect(isInteger("123")).toEqual(true)
  })

  test("invalid", () => {
    expect(isInteger("123.123")).toEqual(false)
    expect(isInteger(NaN)).toEqual(false)
  })
})
