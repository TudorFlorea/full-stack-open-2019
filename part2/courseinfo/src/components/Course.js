import React from "react";

import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={name} />
      {parts && parts.map(part => <Part key={part.id} part={part} />)}
      <Total parts={parts} />
    </>
  );
};

export default Course;
