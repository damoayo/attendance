import React from "react";

const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <br />
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "black",
        }}
        onClick={() => {
          dispatch({ type: "markStudent", payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "deleteStudent", payload: { id } });
        }}
      >
        삭제
      </button>
      <br />
    </div>
  );
};

export default Student;
