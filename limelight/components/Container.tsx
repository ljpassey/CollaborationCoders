
import React from "react";

const Container = (props: any) => {
  return (
    <div
      className={`container  ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
