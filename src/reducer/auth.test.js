import { reducer, actions, selectors } from "./auth"

const token = "foo"
const user = { email: "foo@email.com" }

describe("reducer", () => {
  test("set", () => {
    const action = actions.set({ token, user })

    expect(reducer(undefined, action)).toEqual({
      token,
      user,
    })
  })

  test("remove", () => {
    let state = reducer(undefined, actions.set({ token, user }))
    const action = actions.remove()

    expect(reducer(state, action)).toEqual({
      token: "",
      user: undefined,
    })
  })
})

describe("selectors", () => {
  describe("isAuthenticated", () => {
    test("returns true", () => {
      const state = reducer(undefined, actions.set({ token, user }))
      expect(selectors.isAuthenticated(state)).toEqual(true)
    })

    test("returns false", () => {
      const state = reducer(undefined, {})
      expect(selectors.isAuthenticated(state)).toEqual(false)
    })
  })
})
