import React from "react"
import PropTypes from "prop-types"
import { Message, Button } from "semantic-ui-react"

export function Loading(props) {
  if (props.loading) {
    return props.renderLoading()
  }

  if (props.error) {
    return (
      <Message negative>
        <p>{props.error}</p>
        <Button onClick={props.onClickRetry}>Retry</Button>
      </Message>
    )
  }

  return props.children
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClickRetry: PropTypes.func.isRequired,
  renderLoading: PropTypes.func.isRequired,
}

Loading.defaultProps = {
  renderLoading: () => <div>Loading...</div>,
}

export default Loading
