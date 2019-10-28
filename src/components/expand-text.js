import PropTypes from "prop-types"
import React from "react"

const ExpandText = (props) => (
  <span className="expand-text" onClick={ ExpandText.switch }>
    { props.triggerText }
  </span>
)

ExpandText.switch = (p) => {
  console.log('Shut your pie hole.');
  console.log('Props is', ExpandText);
}

ExpandText.propTypes = {
  triggerText: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default ExpandText
