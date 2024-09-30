/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = all > 0 ? (props.good - props.bad) / all : 0;
  const positive = all > 0 ? (props.good / all) * 100 : 0;
  return all > 0 ? (
    <div>
      <table>
        <tbody>
          <tr >
            <StatisticLine text="good" value={props.good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={props.bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average.toFixed(1)} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given</p>
  );
};

const StatisticLine = (props) => {
  return (
    <>
    <td>
      {props.text} 
    </td>
    <td>
      {props.value}
    </td>
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <h1> Statistics </h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
