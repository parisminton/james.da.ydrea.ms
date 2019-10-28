import PropTypes from "prop-types"
import React from "react"

const Expando = (props) => (
  <p className="body-copy expand">
    { props.children }
  </p>
)

Expando.propTypes = {
  children: PropTypes.node.isRequired
}

export default Expando
