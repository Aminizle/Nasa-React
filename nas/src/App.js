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
      <div className="-z-10 absolute w-full h-full bg-gradient-to-b from-black to-white"></div>

      {/* Page title */}
      <div>
        <h1 className="font-bold pt-5 mb-1 text-gray-200 block text-center text-5xl">
          NASA's archive explorer
        </h1>
      </div>

      {/* DatePicker */}
      <div className="max-w-xl mx-auto">
        <label
          htmlFor="datepicker"
          className="my-4 text-gray-400 block text-center text-lg "
        >
          Select a date to explore NASA's picture of that day.
        </label>
        <DatePicker
          className="cursor-pointer my-5 text-center py-3 rounded-lg shadow-md hover:bg-slate-300 text-gray-600 font-medium bg-slate-200 "
          selected={startDate}
          onChange={(date) => setDate(date)}
          minDate={new Date("1995-06-17")}
          maxDate={new Date()}
        />
        
        {/* Card */}
        <div className="max-w-3xl rounded overflow-hidden shadow-xl bg-slate-200">
          <img className="h-max" src={nasaData?.hdurl} alt={nasaData?.title} />
          <div className="px-6 py-4 ">
            <div className="font-bold text-xl mb-2">{nasaData?.title}</div>
            <p className="text-gray-700 text-base">{nasaData?.explanation}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
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
