import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
<button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-danger">
    {props.children}
    Delete
  </button>
);

export default DeleteBtn;
