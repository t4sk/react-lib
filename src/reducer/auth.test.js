import { reducer, actions, selectors } from "./auth"

const token = "foo"
const user = { email: "foo@email.com" }

describe("reducer", () => {
  test("save", () => {
    const action = actions.saveAuth({ token, user })

    expect(reducer(undefined, action)).toEqual({
      token,
      user,
    })
  })

  test("remove", () => {
    let state = reducer(undefined, actions.saveAuth({ token, user }))
    const action = actions.removeAuth()

    expect(reducer(state, action)).toEqual({
      token: "",
      user: undefined,
    })
  })
})

describe("selectors", () => {
  describe("isAuthenticated", () => {
    test("returns true", () => {
      const state = reducer(undefined, actions.saveAuth({ token, user }))
      expect(selectors.isAuthenticated(state)).toEqual(true)
    })

    test("returns false", () => {
      const state = reducer(undefined, {})
      expect(selectors.isAuthenticated(state)).toEqual(false)
    })
  })
})
