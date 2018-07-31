import React from 'react';

require('../../../css/style.css');

const button = (props) => (
  <button
    className={`button__${props.btnType}`}
    onClick={props.clicked} style={{ width: props.width || "100%" }} >{props.children}</button>

);

export default button;