const UPDATE_ONE = "CACHE/UPDATE_ONE"
const UPDATE_MANY = "CACHE/UPDATE_MANY"

export const actions = {
  updateOne: ({ name, id, data }) => ({ type: UPDATE_ONE, name, id, data }),
  updateMany: ({ name, data = [] }) => ({ type: UPDATE_MANY, name, data }),
}

function getIds(state, name) {
  return (state[name] || {}).ids || []
}

function getById(state, name, id) {
  return ((state[name] || {}).byId || {})[id]
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ONE: {
      const { id, name, data } = action
      const ids = [
        ...getIds(state, name),
        ...(getById(state, name, id) ? [] : [id]),
      ]

      const byId = {
        ...((state[name] || {}).byId || {}),
        [id]: data,
      }

      return {
        ...state,
        [name]: {
          byId,
          ids,
        },
      }
    }
    case UPDATE_MANY: {
      const { name, data } = action

      const ids = [
        ...getIds(state, name),
        ...data.map(({ id }) => id).filter(id => !getById(state, name, id)),
      ]

      const byId = {
        ...((state[name] || {}).byId || {}),
        ...data.reduce((map, item) => {
          map[item.id] = item
          return map
        }, {}),
      }

      return {
        ...state,
        [name]: {
          byId,
          ids,
        },
      }
    }
    default:
      return state
  }
}

export const selectors = {
  getOne(state, name, id, defaultVal) {
    const val = getById(state, name, id)

    if (val == undefined) {
      return defaultVal
    }

    return val
  },
  getMany(state, name) {
    const ids = getIds(state, name)

    return ids.map(id => getById(state, name, id))
  },
}
