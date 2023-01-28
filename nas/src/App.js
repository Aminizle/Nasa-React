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
      <div>
        <h1 className="font-bold mb-1 text-gray-700 block text-center text-5xl">
          NASA's picture of the day
        </h1>
      </div>
      <label
        htmlFor="datepicker"
        className="my-4 text-gray-700 block text-center text-lg"
      >
        Select a date to explore NASA's picture of that day.
      </label>
      <DatePicker
        className="cursor-pointer pl-4  py-3 leading-none rounded-lg shadow-sm hover:bg-slate-300 text-gray-600 font-medium bg-slate-200 "
        selected={startDate}
        onChange={(date) => setDate(date)}
        minDate={new Date("1995-06-17")}
        maxDate={new Date()}
      />
      <div class="max-w-3xl rounded overflow-hidden shadow-lg">
        <img class="w-full" src={nasaData?.hdurl} alt={nasaData?.title} />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{nasaData?.title}</div>
          <p class="text-gray-700 text-base">{nasaData?.explanation}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
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
