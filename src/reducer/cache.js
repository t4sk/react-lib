const UPDATE_ONE = "CACHE/UPDATE_ONE"
const UPDATE_MANY = "CACHE/UPDATE_MANY"

export const actions = {
  updateOneCache: ({
    name,
    id,
    data,
    update = (doc, changes) => ({
      ...doc,
      ...changes,
    }),
  }) => ({
    type: UPDATE_ONE,
    name,
    id,
    data,
    update,
  }),
  updateManyCache: ({
    name,
    data = [],
    update = (doc, changes) => ({
      ...doc,
      ...changes,
    }),
  }) => ({
    type: UPDATE_MANY,
    name,
    data,
    update,
  }),
}

function _unique(arr = []) {
  const inserted = {}

  return arr.reduce((_arr, item) => {
    if (inserted[item]) {
      return _arr
    }

    inserted[item] = true
    _arr.push(item)

    return _arr
  }, [])
}

function _getIds(state, name) {
  return (state[name] || {}).ids || []
}

function _getById(state, name, id) {
  return ((state[name] || {}).byId || {})[id]
}

export function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ONE: {
      const { id, name, data, update } = action

      const ids = [
        ..._getIds(state, name),
        ...(_getById(state, name, id) ? [] : [id]),
      ]

      const byId = {
        ...((state[name] || {}).byId || {}),
        [id]: update(_getById(state, name, id), data),
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
      const { name, data, update } = action

      const ids = _unique([
        ..._getIds(state, name),
        ...data.map(({ id }) => id),
      ])

      const byId = {
        ...state[name],
        ...data.reduce((updates, item) => {
          updates[item.id] = update(_getById(state, name, item.id), item)

          return updates
        }, {}),
      }

      return {
        ...state,
        [name]: {
          ids,
          byId,
        },
      }
    }
    default:
      return state
  }
}

export const selectors = {
  findOneCache(state, name, id) {
    return _getById(state, name, id)
  },
  findManyCache(state, name) {
    const ids = _getIds(state, name)

    return ids.map(id => _getById(state, name, id))
  },
}
