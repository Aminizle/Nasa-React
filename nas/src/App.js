import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [nasaData, setNasaData] = useState({});

  const setDate = (date) => {
    setStartDate(date);
    console.log(startDate);
    FetchNasa(date, setNasaData);
  };

  return (
    <div className="App">
      <PageTitle />
      <PagesubTitle />
      <DatePicker selected={startDate} onChange={(date) => setDate(date)} />
      <img src={ nasaData?.hdurl} />
      <div>
        <ul>
          <li>
            <h3>{ nasaData?.title}</h3> 
            <h3>{ nasaData?.explanation}</h3> 
          </li>
        </ul>
      </div>
    </div>
  );
}

function PageTitle() {
  return (
    <div>
      <h1>NASA's Picture of the Day</h1>
    </div>
  );
}

function PagesubTitle() {
  return (
    <div>
      <h3>Select a date to explore NASA's Picture of the Day archive.</h3>
    </div>
  );
}



function FetchNasa(date, fn) {
  const urlDate = date.getFullYear() + "-" + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));

  console.log(urlDate)
  

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&date=${urlDate}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fn(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}



export default App;
