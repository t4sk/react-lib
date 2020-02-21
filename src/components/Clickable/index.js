import React from "react"
import PropTypes from "prop-types"
import styles from "./index.module.css"

export function Clickable(props) {
  const { onClick, children } = props

  return (
    <button className={styles.component} onClick={onClick}>
      {children}
    </button>
  )
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Clickable
