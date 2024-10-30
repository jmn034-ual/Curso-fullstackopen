import { useState, useEffect } from 'react'
import Find from './Find';
import serviceCountries from './services/serviceCountries';
import Countries from './Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountrie, setSearchCountrie] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [countrie, setCountrie] = useState(null)


  useEffect(()=>{

    if(countrie){
      serviceCountries.getCountrie(searchCountrie)
      .then(countrieToShow => {
        setCountrie(countrieToShow)
      })
    }else{
      serviceCountries.getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
    }
  }, [countrie])


  const handleSearchCountrie = (event) => {
    setSearchCountrie(event.target.value);
    if (searchCountrie != "") {
      setShowAll(false);
    }
  };

  const showCountrie = (nameCountrie) =>{
    setSearchCountrie(nameCountrie)
  }

  const getWeather = (nameCapital, code) => {
    let codeCountrie = code.replace(".", "");

    return serviceCountries.getWeather(nameCapital, codeCountrie)
        .then(tempWeather => {
            return tempWeather; 
        });
};


  const countrieToShow = showAll
    ? countries
    : countries.filter((countrie) => countrie.name.common.toLowerCase().includes(searchCountrie.toLowerCase()));

  return (
    <div>
      <Find countrie={searchCountrie}  handleSearchCountrie={handleSearchCountrie}/>
      <Countries countries={countrieToShow} showCountrie={showCountrie} weather={getWeather}/>
    </div>
  )
}

export default App
