import React, { useReducer, createContext, useEffect, useRef } from "react"

const UPDATE = "SIZE/UPDATE"

const INITIAL_STATE = {
  width: 0,
  height: 0,
}

export const actions = {
  update: ({ width, height }) => ({ type: UPDATE, width, height }),
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        width: action.width,
        height: action.height,
      }
    default:
      return state
  }
}

const SizeContext = createContext()

export function SizeContextProvider(props) {
  const { children } = props

  const ref = useRef()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    function update() {
      dispatch.update({
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      })
    }

    update()

    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={ref}>
      <SizeContext.Provider value={state}>{children}</SizeContext.Provider>
    </div>
  )
}

export default function withSize(Component) {
  function Size(props) {
    return (
      <SizeContext.Consumer>
        {value => <Component {...props} size={value} />}
      </SizeContext.Consumer>
    )
  }

  return Size
}
