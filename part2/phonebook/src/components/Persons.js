import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
