import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [])

  return null
}

ScrollToTop.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(ScrollToTop)
