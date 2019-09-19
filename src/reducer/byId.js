const UPDATE_ONE = "BY_ID/UPDATE_ONE"
const UPDATE_MANY = "BY_ID/UPDATE_MANY"

export const actions = {
  updateOne: ({ id, update }) => ({ type: UPDATE_ONE, id, update }),
  updateMany: ({ update }) => ({ type: UPDATE_MANY, update }),
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ONE: {
      const { id, update } = action

      return {
        ...state,
        [id]: update(state[id]),
      }
    }
    case UPDATE_MANY: {
      const { update } = action

      return {
        ...state,
        ...update(state),
      }
    }
    default:
      return state
  }
}
