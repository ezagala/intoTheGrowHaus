import React from "react";

export const LoginBtn = props => (
  <button {...props} style={{marginBottom: 10 }} className="btn btn-primary btn-block">
    {props.children}
  </button>
);
