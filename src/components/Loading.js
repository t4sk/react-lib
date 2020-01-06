import React from "react"
import PropTypes from "prop-types"
import { Message, Button } from "semantic-ui-react"

export function Loading(props) {
  const { loading, error, renderLoading, renderError, children } = props

  if (loading) {
    return renderLoading()
  }

  if (error) {
    return renderError(props)
  }

  return props.children()
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  renderLoading: PropTypes.func.isRequired,
  renderError: PropTypes.func.isRequired,
  onClickRetry: PropTypes.func.isRequired,
}

Loading.defaultProps = {
  renderLoading: () => <div>Loading...</div>,
  renderError: props => (
    <Message negative>
      <p>{props.error}</p>
      <Button onClick={props.onClickRetry}>Retry</Button>
    </Message>
  ),
}

export default Loading
