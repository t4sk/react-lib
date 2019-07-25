import React from "react"
import PropTypes from "prop-types"
import styles from "./LinkButton.module.css"

export function LinkButton(props) {
  const { onClick, children } = props

  return (
    <button className={styles.Component} onClick={onClick}>
      {children}
    </button>
  )
}

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default LinkButton
