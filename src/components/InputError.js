import React from "react"
import PropTypes from "prop-types"
import styles from "./InputError.module.css"

export function InputError(props) {
  const { error } = props

  return <div className={styles.InputError}>{error}</div>
}

InputError.propTypes = {
  error: PropTypes.string.isRequired,
}

export default InputError
