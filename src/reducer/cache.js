import * as byId from "./byId"

const UPDATE_ONE = "CACHE/UPDATE_ONE"
const UPDATE_MANY = "CACHE/UPDATE_MANY"

export const actions = {
  updateOneCache: ({ name, id, update }) => ({
    type: UPDATE_ONE,
    name,
    id,
    update,
  }),
  updateManyCache: ({ name, update }) => ({ type: UPDATE_MANY, name, update }),
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ONE: {
      const { name, id, update } = action

      return {
        ...state,
        [name]: byId.reducer(
          state[name],
          byId.actions.updateOne({ id, update })
        ),
      }
    }
    case UPDATE_MANY: {
      const { name, update } = action

      return {
        ...state,
        [name]: byId.reducer(state[name], byId.actions.updateMany({ update })),
      }
    }
    default:
      return state
  }
}

export const selectors = {
  getOne: (state, name, id) => (state[name] ? state[name][id] : undefined),
  getMany: (state, name) => state[name] || {},
}
