import { reducer, actions } from "./withAuth"

const user = {
  uid: "1",
  email: "foo@email.com",
}

describe("reducer", () => {
  test("set", () => {
    const action = actions.set({ user })

    expect(reducer(undefined, action)).toEqual({
      user,
    })
  })

  test("update", () => {
    let state = reducer(undefined, actions.set({ user }))

    const action = actions.update({ roles: { admin: true } })

    expect(reducer(state, action)).toEqual({
      user,
      roles: { admin: true },
    })
  })

  test("remove", () => {
    let state = reducer(undefined, actions.set({ user }))
    const action = actions.remove()

    expect(reducer(state, action)).toEqual({})
  })
})
