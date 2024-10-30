import { useState, useEffect} from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState()


  useEffect(()=>{
    personsService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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
    if (newName === "" || newNumber === "") {
      alert("Empty");
    }else if (persons.some((person) => person.name === newName)) {
      const personToReplace = persons.find((person) => person.name === newName)
      if(window.confirm(`${personToReplace.name} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...personToReplace, number: newNumber}
        personsService.update(personToReplace.id, updatedPerson)
        .then((returnedPerson) =>{
          const index = persons.findIndex(person => person.id === returnedPerson.id)
          const updatedPersons = [...persons]
          updatedPersons[index] = returnedPerson
          setPersons(updatedPersons)
          setErrorMessage(`Updated number of ${returnedPerson.name}`)
          setIsError(false)
          temporizador()
        })
        .catch(() => {
          setErrorMessage(
            `Information of '${personToReplace.name}' has already been removed from server`
          )
          setIsError(true)
          temporizador()
        })
      }
      setNewName("");
      setNewNumber("");
    }else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      };
      personsService.create(newPerson)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson));
        setErrorMessage(`Added ${returnedPerson.name}`)
        setIsError(false)
        temporizador()
        setNewName("");
        setNewNumber("");
      })      
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    if(window.confirm(`Delete ${personToDelete.name} ?`)){
      setErrorMessage(`Deleted ${personToDelete.name}`)
        setIsError(false)
        temporizador()
      personsService.deletePerson(id)
      .then(() =>{
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const personToShow = showAll
    ? persons
    : persons.filter((person) => person.name.includes(filter));

  const temporizador = () => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message= {errorMessage} isError={isError}/>
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
      <Persons persons={personToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
