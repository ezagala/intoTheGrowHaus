import React from "react";

export const SearchBtn = props => (
  <button {...props} style={{marginBottom: 10 }} className="btn btn-primary btn-block">
    {props.children}
  </button>
);
