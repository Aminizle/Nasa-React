import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaHome,
} from "react-icons/fa";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [nasaData, setNasaData] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const setDate = (date) => {
    setStartDate(date);
    console.log(startDate);
    FetchNasa(date, setNasaData);
  };

  return (
    <div className="App">
      <div className={darkMode ? "dark" : ""}>
        <div className="-z-10 absolute w-full h-full bg-gradient-to-b from-[#5696f0] to-white dark:from-[#001b5f]"></div>

        {/* Page title */}

        <div className="flex justify-center pt-5 mb-1">
          <h1 className="font-bold text-gray-200 text-5xl">
            NASA's archive explorer
          </h1>
          <BsFillMoonStarsFill
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-2xl mx-2 text-gray-700 hover:text-[#FFE87C] dark:text-gray-200 dark:hover:text-[#FFE87C]"
          />
        </div>

        {/* DatePicker */}
        <div className="max-w-xl mx-auto">
          <label
            htmlFor="datepicker"
            className="my-4 text-gray-300 block text-center text-lg "
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

          <InitialLoad />

          {/* Card */}
          <div className="max-w-3xl mb-10 rounded overflow-hidden shadow-xl bg-slate-200">
            <a href={nasaData.hdurl} target="blank">
              <img
                className="h-max"
                src={nasaData?.hdurl}
                alt={nasaData?.title}
              />
            </a>
            <div className="px-6 py-4 ">
              <div className="font-bold text-xl mb-2">{nasaData?.title}</div>
              <p className="text-gray-700 text-base">{nasaData?.explanation}</p>
            </div>

            {/* Social media links */}
            <div className="flex justify-around px-6 pt-4 pb-2">
              <span className="py-1 text-3xl text-gray-700 hover:text-[#1d9bf0] mr-2 mb-2">
                <a href="https://twitter.com/DevAmeenM" target="blank">
                  <FaTwitter />
                </a>
              </span>
              <span className="py-1 text-3xl text-gray-700 hover:text-[#7a007a] mr-2 mb-2">
                <a href="https://github.com/Aminizle" target="blank">
                  <FaGithub />
                </a>
              </span>
              <span className="py-1 text-3xl text-gray-700 hover:text-[#ff0000] mr-2 mb-2">
                <a
                  href="https://www.youtube.com/channel/UCtnzaJeLTPhhH6jolpdGhpw"
                  target="blank"
                >
                  <FaYoutube />
                </a>
              </span>
              <span className="py-1 text-3xl text-gray-700 hover:text-[#0a66c2] mr-2 mb-2">
                <a
                  href="https://www.linkedin.com/in/ameen-mohiyuddin-413bab197/"
                  target="blank"
                >
                  <FaLinkedin />
                </a>
              </span>
              <span className="py-1 text-3xl text-gray-700 hover:text-[#fd5602] mr-2 mb-2">
                <a href="https://ameenmohiyuddin.netlify.app/" target="blank">
                  <FaHome />
                </a>
              </span>
            </div>
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

function InitialLoad(fn) {
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&date=2023-01-28`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fn(data);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
},[])
}

export default App;
