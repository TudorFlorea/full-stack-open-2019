import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then(response => {
    //   setPersons(response.data);
    // });
    personService.getAll().then(initalPersons => {
      setPersons(initalPersons);
    });
  }, []);

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = event => {
    setFilterName(event.target.value);
  };

  const handleNewPersonSubmit = event => {
    event.preventDefault();
    const duplicatePersons = persons.filter(
      person => person.name === newName.trim()
    );
    if (duplicatePersons.length) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    };

    personService.create(newPerson).then(createdPerson => {
      setPersons([...persons, createdPerson]);
    });

    setNewName("");
    setNewNumber("");
  };

  const personsToShow = filterName
    ? persons.filter(person => person.name.search(filterName) !== -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />

      <PersonForm
        onSubmit={handleNewPersonSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
