import { reducer, actions, selectors } from "./cache"

describe("reducer", () => {
  test("updateOneCache", () => {
    const name = "foo"
    const id = "123"
    const data = { bar: "123" }

    const action = actions.updateOneCache({
      name,
      id,
      data,
    })

    expect(reducer(undefined, action)).toEqual({
      [name]: {
        byId: {
          [id]: data,
        },
        ids: [id],
      },
    })
  })

  test("updateManyCache", () => {
    const name = "foo"
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]

    const action = actions.updateManyCache({
      name,
      data,
    })

    expect(reducer(undefined, action)).toEqual({
      [name]: {
        byId: {
          1: { id: 1 },
          2: { id: 2 },
        },
        ids: [1, 2],
      },
    })
  })
})

describe("selectors", () => {
  test("findOneCache", () => {
    const action = actions.updateOneCache({
      id: "1",
      name: "foo",
      data: { id: 1 },
    })
    const state = reducer(undefined, action)

    expect(selectors.findOneCache(state, "foo", "1")).toEqual({ id: 1 })
  })

  test("findManyCache", () => {
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]

    const action = actions.updateManyCache({ name: "foo", data })
    const state = reducer(undefined, action)

    expect(selectors.findManyCache(state, "foo")).toEqual(data)
  })
})
