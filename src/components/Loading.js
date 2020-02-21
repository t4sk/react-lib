import React from "react"
import PropTypes from "prop-types"

export function Loading(props) {
  const { loading, error, renderLoading, renderError, children } = props

  if (loading) {
    return renderLoading()
  }

  if (error) {
    return renderError(props)
  }

  return children()
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  renderLoading: PropTypes.func.isRequired,
  renderError: PropTypes.func.isRequired,
}

Loading.defaultProps = {
  renderLoading: () => "Loading...",
  renderError: props => props.error,
}

export default Loading
