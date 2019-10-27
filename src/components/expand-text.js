import PropTypes from "prop-types"
import React from "react"

const ExpandText = (props) => (
  <p className="body-copy expand">
    { props.children }
  </p>
)

ExpandText.propTypes = {
  triggerText: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default ExpandText
