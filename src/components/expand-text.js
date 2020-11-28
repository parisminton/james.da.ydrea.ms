import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

// page loads; expanded text is in the markup, display: none'd
// trigger text is visible, waiting to be clicked

const ExpandText = (props) => {
  const [ expansion_state, setExpansionState ] = useState('closed');
  const [ display_string, setDisplayString ] = useState(props.triggerText);

  const handleExpansion = () => {
    if (expansion_state === 'closed') {
      expandText(props.children[0]);
    }
    if (expansion_state === 'expanded') {
      expandText(props.triggerText);
    }
  } // end handleExpansion

  let classes = "expand-text closed";

  const expandText = function (string) {
    const full_string = string;
    let string_in_progress = '';
    let i = 0;

    if (expansion_state === 'closed') {
      setExpansionState('expanding');
      console.log('THE EXPANSION STATE IS', expansion_state);
      classes = 'expand-text expanding';
      console.log('Expanding ...');
    }
    if (expansion_state === 'expanded') {
      setExpansionState('closing');
      console.log('THE EXPANSION STATE IS', expansion_state);
      classes = 'expand-text closing';
      console.log('Closing ...');
    }

    const addOn = function () {
      window.setTimeout( () => {
        string_in_progress += full_string.charAt(i);
        setDisplayString(string_in_progress);
        i += 1;

        if (i < full_string.length) {
          console.log('BEFORE THE EVENT', expansion_state);
          setExpansionState('expanding');
          console.log('AFTER THE EVENT', expansion_state);
          addOn();
        }
        else {
          console.log('Delicious vinyl.', expansion_state);
          if (expansion_state === 'expanding') {
            setExpansionState('expanded');
            classes = 'expand-text expanded';
            console.log('I saw the best pair of driving gloves.');
          }
          else {
            setExpansionState('closed');
            classes = 'expand-text closed';
            console.log('That is the worst thing you could\'ve done.');
          }
        }
      }, 0.25);
    } // end addon

    addOn();
  } // end expandText

  useEffect(
    () => {
      const full_string = display_string;
      let full_string_isnt_finished_growing = false;

      const midpoint = Math.ceil(full_string.length / 2);
      let left_edge = 0,
          right_edge = full_string.length;

      const growTheStringByAnIncrement = () => {
        if (full_string_isnt_finished_growing) {
          requestAnimationFrame(growTheStringByAnIncrement);
        }
      }

      // requestAnimationFrame(growTheStringByAnIncrement);

      console.log('YOU HAVE TO MAKE AN EFFORT', expansion_state);
      return () => {
        console.log('I am an effect');
      }
    },
    [display_string]
  );

  return <React.Fragment>
    <span className="expand-bridge">{ props.before }</span>
    <span className={ classes } onClick={ handleExpansion }>
      { display_string }
    </span>
    <span className="expand-after">{ props.after }</span>
  </React.Fragment>
}

ExpandText.propTypes = {
  triggerText: PropTypes.string,
  thearray: PropTypes.array,
  children: PropTypes.node.isRequired
}

export default ExpandText
