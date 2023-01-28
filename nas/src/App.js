import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import React, { useEffect, useState } from "react";
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
      <div>
        <h1 className="font-bold mb-1 text-gray-700 block">
          NASA's Picture of the Day
        </h1>
      </div>
      <label
        htmlFor="datepicker"
        className="font-bold mb-1 text-gray-700 block"
      >
        Select Date explore NASA's Picture of that Day.
      </label>
      <DatePicker
        className="cursor-pointer pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium bg-slate-200"
        selected={startDate}
        onChange={(date) => setDate(date)}
        minDate={new Date("1995-06-17")}
        maxDate={new Date()}
      />
      <img src={nasaData?.hdurl} alt="" />
      <div>
        <ul>
          <li>
            <h3>{nasaData?.title}</h3>
            <h3>{nasaData?.explanation}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
}

function FetchNasa(date, fn) {
  const urlDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());

  console.log(urlDate);
  
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
