/* eslint-disable react/prop-types */
const Find = ({countrie, handleSearchCountrie, }) => {
  return (
    <div>
        find countries <input value={countrie} onChange={handleSearchCountrie}/>
    </div>
  );
};
export default Find;
