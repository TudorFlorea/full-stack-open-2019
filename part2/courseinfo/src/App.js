import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc = 0, part) => {
    return acc + part.exercises;
  }, 0);
  console.log(total);
  return <p>total of {total} exercises</p>;
};

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

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
