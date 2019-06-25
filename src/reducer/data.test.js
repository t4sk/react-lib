import { reducer, actions, selectors } from "./data"

describe("reducer", () => {
  test("updateOne", () => {
    const name = "foo"
    const id = "123"
    const data = { bar: "123" }

    const action = actions.updateOne({ name, id, data })

    expect(reducer(undefined, action)).toEqual({
      [name]: {
        byId: {
          [id]: data,
        },
        ids: [id],
      },
    })
  })

  test("updateMany", () => {
    const name = "foo"
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]

    const action = actions.updateMany({ name, data })

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
  test("getOne", () => {
    const action = actions.updateOne({ id: "1", name: "foo", data: { id: 1 } })
    const state = reducer(undefined, action)

    expect(selectors.getOne(state, "foo", "1")).toEqual({ id: 1 })
  })

  test("getMany", () => {
    const data = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]

    const action = actions.updateMany({ name: "foo", data })
    const state = reducer(undefined, action)

    expect(selectors.getMany(state, "foo")).toEqual(data)
  })
})
