import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleNewNameChanged = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setFilter(event.target.value);
    if (filter != "") {
      setShowAll(false);
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newName === "" || newNumber === "") {
      alert("Empty");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));

      setNewName("");
      setNewNumber("");
    }
  };

  const personToShow = showAll
    ? persons
    : persons.filter((person) => person.name.includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewNameChanged={handleNewNameChanged}
        handleNewNumberChanged={handleNewNumberChanged}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personToShow} />
    </div>
  );
};

export default App;
