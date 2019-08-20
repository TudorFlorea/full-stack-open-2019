import React from "react";

const Total = ({ parts }) => {
  let totalExercises = 0;
  if (parts) {
    parts.forEach(part => {
      totalExercises += part.exercises;
    });
  }
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
