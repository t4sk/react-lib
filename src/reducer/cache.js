const UPDATE = "CACHE/UPDATE"

export const actions = {
  updateCache: ({ key, update = val => val }) => ({
    type: UPDATE,
    key,
    update,
  }),
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE: {
      const { key, update } = action

      return {
        ...state,
        [key]: update(state[key]),
      }
    }
    default:
      return state
  }
}

export const selectors = {
  getCache(state, key, defaultVal) {
    if (state[key] == undefined) {
      return defaultVal
    }

    return state[key]
  },
}
