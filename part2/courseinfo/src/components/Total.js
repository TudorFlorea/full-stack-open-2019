import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((acc = 0, part) => {
    return acc + part.exercises;
  }, 0);
  console.log(total);
  return <p>total of {total} exercises</p>;
};

export default Total;
