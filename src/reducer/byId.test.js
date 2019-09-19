import { reducer, actions } from "./byId"

describe("reducer", () => {
  describe("update one", () => {
    test("insert", () => {
      const action = actions.updateOne({
        id: "1",
        update: data => ({
          ...data,
          foo: "bar",
        }),
      })

      expect(reducer(undefined, action)).toEqual({
        "1": { foo: "bar" },
      })
    })

    test("update", () => {
      const action = actions.updateOne({
        id: "1",
        update: data => ({
          ...data,
          foo: "bar",
        }),
      })

      const state = {
        "1": { foo: "baz", bar: "bar" },
        "2": { a: "a" },
      }

      expect(reducer(state, action)).toEqual({
        "1": { foo: "bar", bar: "bar" },
        "2": { a: "a" },
      })
    })
  })

  describe("update many", () => {
    test("insert", () => {
      const action = actions.updateMany({
        update: state => ({
          ...state,
          "1": { id: "1" },
          "2": { id: "2" },
        }),
      })

      expect(reducer(undefined, action)).toEqual({
        "1": { id: "1" },
        "2": { id: "2" },
      })
    })

    test("update", () => {
      const action = actions.updateMany({
        update: state => ({
          ...state,
          "1": { id: "1", foo: "bar" },
          "3": { id: "3" },
        }),
      })

      const state = {
        "1": { id: "1" },
        "2": { id: "2" },
      }

      expect(reducer(state, action)).toEqual({
        "1": { id: "1", foo: "bar" },
        "2": { id: "2" },
        "3": { id: "3" },
      })
    })
  })
})
