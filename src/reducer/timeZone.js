const SET = "TIME_ZONE/SET"

export function reducer(state = "Asia/Tokyo", action) {
  switch (action.type) {
    case SET:
      return action.timeZone || state
    default:
      return state
  }
}

export const actions = {
  set: timeZone => ({ type: SET, timeZone }),
}
