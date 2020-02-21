import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

function ScrollToTop({ location }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

ScrollToTop.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(ScrollToTop)
