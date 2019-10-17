import React from "react";

import personsService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
  const handlePersonDelete = personToDelete => {
    const { id, name } = personToDelete;
    const answer = window.confirm(`Delete ${name}?`);
    if (answer) {
      personsService.deletePerson(id).then(data => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
    console.log(answer, id);
  };

  return (
    <>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => {
              handlePersonDelete(person);
            }}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
