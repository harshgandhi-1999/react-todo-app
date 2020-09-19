import React from "react";

const Label = (props) => {
  return (
    <span className="my-label-style" {...props}>
      {props.text}
    </span>
  );
};

export default Label;
