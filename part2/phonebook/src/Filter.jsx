/* eslint-disable react/prop-types */
const Filter = ({filter, handleNewFilter}) => {
  return (
    <div>
      <div>
        filter shown with <input value={filter} onChange={handleNewFilter}/>
      </div>
    </div>
  );
};
export default Filter;
