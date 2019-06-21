import { reducer, actions, selectors } from "./auth"

const token = "foo"
const user = { email: "foo@email.com" }

describe("reducer", () => {
  test("log in", () => {
    const action = actions.logIn({ token, user })

    expect(reducer(undefined, action)).toEqual({
      token,
      user,
    })
  })

  test("log out", () => {
    let state = reducer(undefined, actions.logIn({ token, user }))
    const action = actions.logOut()

    expect(reducer(state, action)).toEqual({
      token: "",
      user: undefined,
    })
  })
})

describe("selectors", () => {
  describe("isAuthenticated", () => {
    test("returns true", () => {
      const state = reducer(undefined, actions.logIn({ token, user }))
      expect(selectors.isAuthenticated(state)).toEqual(true)
    })

    test("returns false", () => {
      const state = reducer(undefined, {})
      expect(selectors.isAuthenticated(state)).toEqual(false)
    })
  })
})
