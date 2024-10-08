/* eslint-disable react/prop-types */
const PersonForm = ({newName, newNumber, handleNewNameChanged, handleNewNumberChanged, addNewPerson}) => {

  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNewNameChanged} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChanged}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
