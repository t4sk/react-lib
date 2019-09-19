import { reducer, actions, selectors } from "./cache"

describe("reducer", () => {
  describe("update one", () => {
    test("insert", () => {
      const action = actions.updateOneCache({
        name: "some-collection",
        id: "1",
        update: data => ({
          ...data,
          foo: "bar",
        }),
      })

      expect(reducer(undefined, action)).toEqual({
        "some-collection": {
          "1": { foo: "bar" },
        },
      })
    })

    test("update", () => {
      const action = actions.updateOneCache({
        name: "some-collection",
        id: "1",
        update: data => ({
          ...data,
          foo: "bar",
        }),
      })

      const state = {
        "some-collection": {
          "1": { foo: "baz", bar: "bar" },
          "2": { a: "a" },
        },
      }

      expect(reducer(state, action)).toEqual({
        "some-collection": {
          "1": { foo: "bar", bar: "bar" },
          "2": { a: "a" },
        },
      })
    })
  })

  describe("update many", () => {
    test("insert", () => {
      const action = actions.updateManyCache({
        name: "collection-1",
        update: state => ({
          ...state,
          "1": { id: "1" },
          "2": { id: "2" },
        }),
      })

      expect(reducer(undefined, action)).toEqual({
        "collection-1": {
          "1": { id: "1" },
          "2": { id: "2" },
        },
      })
    })

    test("update", () => {
      const action = actions.updateManyCache({
        name: "collection-1",
        update: state => ({
          ...state,
          "1": { id: "1", foo: "bar" },
          "3": { id: "3" },
        }),
      })

      const state = {
        "collection-1": {
          "1": { id: "1" },
          "2": { id: "2" },
        },
        "collection-2": {},
      }

      expect(reducer(state, action)).toEqual({
        "collection-1": {
          "1": { id: "1", foo: "bar" },
          "2": { id: "2" },
          "3": { id: "3" },
        },
        "collection-2": {},
      })
    })
  })
})

describe("selectors", () => {
  describe("getOne", () => {
    test("get", () => {
      const state = {
        "some-collection": {
          "1": { id: "1" },
        },
      }

      expect(selectors.getOne(state, "some-collection", "1")).toEqual({
        id: "1",
      })
    })

    test("value at name is undefined", () => {
      expect(selectors.getOne({}, "some-collection", "1")).toEqual(undefined)
    })

    test("value at id is undefined", () => {
      const state = {
        "some-collection": {},
      }

      expect(selectors.getOne(state, "some-collection", "1")).toEqual(undefined)
    })
  })

  describe("getMany", () => {
    test("get many", () => {
      const state = {
        "some-collection": {
          "1": { id: "1" },
          "2": { id: "2" },
        },
      }

      expect(selectors.getMany(state, "some-collection")).toEqual({
        "1": { id: "1" },
        "2": { id: "2" },
      })
    })

    test("value at name is undefined", () => {
      expect(selectors.getMany({}, "some-collection")).toEqual({})
    })
  })
})
