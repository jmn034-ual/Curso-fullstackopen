/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Countries = ({ countries, showCountrie, weather }) => {
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null)
  const [wind, setWind] = useState(null)
  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital;
      const tld = countries[0].tld[0];

      weather(capital, tld).then(temp => {
        setTemperature(temp.main.temp);
        setIcon(`https://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`)
        setWind(temp.wind.speed)
      }).catch(err => {
        console.error("Error fetching weather:", err);
      });
    }
  }, [countries, weather]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
        </div>
        <div>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} />
          <h2>Weather in {countries[0].capital}</h2>
          {temperature !== null ? (
            <p>Temperature: {temperature} Celsius</p>
          ) : (
            <p>Loading temperature...</p>
          )}
          {icon && (
            <img src={icon} alt={`Weather icon for ${countries[0].capital}`} />
          )}
          {wind && (
            <p>
              Wind: {wind} m/s
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <ul>
      {countries.map((countrie) => (
        <li key={countrie.name.official}>
          {countrie.name.common}{" "}
          <button onClick={() => showCountrie(countrie.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
