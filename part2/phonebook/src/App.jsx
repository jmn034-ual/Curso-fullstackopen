import { useState, useEffect} from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      console.log(persons)
    })
  }, [])

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
