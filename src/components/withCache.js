import { connect } from "react-redux"
import { selectors, actions } from "../reducer"

function mapById(data = [], getId = ({ id }) => id) {
  return data.reduce((map, item) => {
    map[getId(item)] = item
    return map
  }, {})
}

function getIds(data = [], getId = ({ id }) => id, sortBy) {
  return data
    .slice()
    .sort(sortBy)
    .map(getId)
}

function getMany(ids = [], byId = {}, filterBy) {
  return ids.map(id => byId[id]).filter(filterBy)
}

function _sortById(x, y) {
  if (x.id > y.id) {
    return 1
  }

  if (x.id < y.id) {
    return -1
  }

  return 0
}

export default function withCache({
  name = "cache",
  key,
  getId = ({ id }) => id,
  sortBy = _sortById,
  filterBy = a => true,
  // getById = props => id
  getById,
} = {}) {
  return Component =>
    connect(
      (state, props) => {
        const { count = 0, byId = {}, ids = [] } = selectors.cache.getCache(
          state.cache,
          key,
          {}
        )

        if (getById) {
          return {
            [name]: byId[getById(props)],
          }
        }

        return {
          [name]: {
            data: getMany(ids, byId, filterBy),
            count,
          },
        }
      },
      {
        saveManyCache: (props, response, params) => {
          const { count = 0, data = [] } = response

          return actions.cache.updateCache({
            key,
            update: _ => {
              const byId = mapById(data, getId)
              const ids = getIds(data, getId, sortBy)

              return {
                byId,
                ids,
                count,
              }
            },
          })
        },
        saveOneCache: (props, response, params) => {
          return actions.cache.updateCache({
            key,
            update: (val = {}) => {
              const { count = 0, byId = {} } = val

              const id = getId(response)

              const _byId = {
                ...byId,
                [id]: response,
              }

              const _ids = getIds(Object.values(_byId), getId, sortBy)

              return {
                count,
                byId: _byId,
                ids: _ids,
              }
            },
          })
        },
      }
    )(Component)
}
