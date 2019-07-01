import { reducer, actions, selectors } from "./queries"

describe("reducer", () => {
  test("start", () => {
    const queryId = "foo"

    const action = actions.queryStart(queryId)
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: true,
        response: undefined,
        error: "",
      },
    })
  })

  test("success", () => {
    const queryId = "foo"
    const response = { data: 123 }

    const action = actions.querySuccess({ queryId, response })
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: false,
        response,
        error: "",
      },
    })
  })

  test("fail", () => {
    const queryId = "foo"
    const error = "error"

    const action = actions.queryFail({ queryId, error })
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: false,
        response: undefined,
        error,
      },
    })
  })
})

describe("selectors", () => {
  test("get", () => {
    const state = reducer(undefined, {})

    expect(selectors.get(state, "foo", "bar")).toEqual({
      fetching: false,
      response: undefined,
      error: "",
    })
  })
})

describe("reducer", () => {
  test("start", () => {
    const queryId = "foo"

    const action = actions.start(queryId)
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: true,
        response: undefined,
        error: "",
      },
    })
  })

  test("success", () => {
    const queryId = "foo"
    const response = { data: 123 }

    const action = actions.success({ queryId, response })
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: false,
        response,
        error: "",
      },
    })
  })

  test("fail", () => {
    const queryId = "foo"
    const error = "error"

    const action = actions.fail({ queryId, error })
    expect(reducer(undefined, action)).toEqual({
      [queryId]: {
        fetching: false,
        response: undefined,
        error,
      },
    })
  })
})

// describe("selectors", () => {
//   test("get", () => {
//     const state = reducer(undefined, {})
//
//     expect(selectors.get(state, "foo", "bar")).toEqual({
//       fetching: false,
//       response: undefined,
//       error: "",
//     })
//   })
//
//   describe("getById", () => {
//     test("get by id", () => {
//       const action = actions.success({
//         name: "foo",
//         queryId: "bar",
//         response: {},
//         byId: { 1: "data by id" },
//       })
//
//       const state = reducer(undefined, action)
//
//       expect(selectors.getById(state, { name: "foo", id: 1 })).toEqual(
//         "data by id"
//       )
//     })
//
//     test("undefined", () => {
//       const state = reducer(undefined, {})
//
//       expect(selectors.getById(state, { name: "foo", id: 1 })).toEqual(
//         undefined
//       )
//     })
//   })
// })
