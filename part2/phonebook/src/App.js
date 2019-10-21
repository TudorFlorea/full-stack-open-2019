import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
      const personToUpdate = duplicatePersons[0];
      const replace = window.confirm(
        `${personToUpdate.name} is already added to phonebook, replace the old number with the new one?`
      );
      if (replace) {
        personToUpdate.number = newNumber;
        personService
          .update(personToUpdate)
          .then(data => {
            setPersons(
              persons.map(person => {
                return person.id === data.id ? data : person;
              })
            );
            setNotification(`Updated ${personToUpdate.name}'s number`);
          })
          .catch(err => {
            setPersons(
              persons.filter(person => {
                return person.id !== personToUpdate.id;
              })
            );
            setErrorMessage(
              `Information of ${personToUpdate.name}  has already been removed from the server`
            );
          });
      }
    } else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim()
      };

      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons([...persons, createdPerson]);
          setNotification(`Added ${newName}`);
        })
        .catch(err => {
          setErrorMessage(err.response.data.error);
        });
    }

    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotification("");
      setErrorMessage("");
    }, 5000);
  };

  const personsToShow = filterName
    ? persons.filter(person => person.name.search(filterName) !== -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage ? (
        <Notification message={errorMessage} isError={true} />
      ) : null}
      {notification ? <Notification message={notification} /> : null}

      <Filter value={filterName} onChange={handleFilterNameChange} />

      <PersonForm
        onSubmit={handleNewPersonSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
