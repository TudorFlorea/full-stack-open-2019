import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
    setPersons([
      ...persons,
      { name: newName.trim(), number: newNumber.trim() }
    ]);
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = filterName
    ? persons.filter(person => person.name.search(filterName) != -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with:
        <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <form onSubmit={handleNewPersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
