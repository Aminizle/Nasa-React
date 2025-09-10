import React, { useState, useEffect } from "react";
import Particle from "./components/Particle"; 
import SocialLinks from "./components/SocialLinks";

// Helper function to format the date to YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateString = (ymd) => {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
};

function App() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [selectedDate, setSelectedDate] = useState(formatDate(yesterday));
  const [nasaData, setNasaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNasaData = async (date) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = process.env.REACT_APP_NASA_KEY;
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch NASA data: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.media_type !== "image") {
        throw new Error("Content for this date is not an image.");
      }
      setNasaData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaData(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchNasaData(newDate);
  };

  const changeDateBy = (offset) => {
    const current = parseDateString(selectedDate);
    current.setDate(current.getDate() + offset);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (current > today) current.setTime(today.getTime());
    const newDate = formatDate(current);
    setSelectedDate(newDate);
    fetchNasaData(newDate);
  };

  const handlePrevDay = () => changeDateBy(-1);
  const handleNextDay = () => changeDateBy(1);

  const isAtToday = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sel = parseDateString(selectedDate);
    return sel.getTime() >= today.getTime();
  })();

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 font-sans relative overflow-hidden">
      {/* Particle background */}
      <Particle />

      {/* Social Links (top-right corner) */}
      <SocialLinks />

      {/* Header */}
      <div className="z-10 relative pt-5 mb-6 mx-auto">
        <h1 className="font-bold text-gray-200 text-4xl md:text-6xl underline">
          NASA's Archive Explorer
        </h1>
      </div>

      <div className="z-10 relative max-w-xl mx-auto w-full">
        <label
          htmlFor="datepicker"
          className="my-4 text-gray-300 block text-lg text-center"
        >
          Select a date to explore NASA's picture of that day.
        </label>

        {/* Date picker with glowing cosmic arrows */}
        <div className="flex items-center justify-center gap-2">
          {/* Left Arrow */}
          <button onClick={handlePrevDay} className="p-2 rounded-full transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-white drop-shadow-[0_0_8px_#60a5fa]"
            >
              <path d="M15 19l-7-7 7-7" />
              <circle cx="7" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>

          {/* Date input */}
          <input
            type="date"
            id="datepicker"
            value={selectedDate}
            onChange={handleDateChange}
            min="1995-06-16"
            max={formatDate(new Date())}
            className="z-20 relative cursor-pointer my-5 w-full text-center py-3 rounded-lg shadow-md 
                       hover:bg-slate-300 
                       text-gray-800 font-medium bg-slate-200 
                       transition-colors duration-200"
          />

          {/* Right Arrow */}
          <button
            onClick={handleNextDay}
            disabled={isAtToday}
            className={`p-2 rounded-full transition ${
              isAtToday ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-10 h-10 text-white drop-shadow-[0_0_8px_#a78bfa] ${
                isAtToday ? "opacity-50" : ""
              }`}
            >
              <path d="M9 5l7 7-7 7" />
              <circle cx="17" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* NASA content */}
        <div className="z-1 relative max-w-3xl mb-10 rounded-xl overflow-hidden shadow-2xl bg-gray-800 border-2 border-gray-700 w-full">
          {isLoading ? (
            <div className="p-10 text-center text-white text-lg">Loading...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 text-lg">Error: {error}</div>
          ) : (
            <>
              {nasaData?.media_type === "image" ? (
                <a
                  href={nasaData.hdurl || nasaData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-full h-auto object-cover rounded-t-xl"
                    src={nasaData.url}
                    alt={nasaData.title}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400/8b5cf6/ffffff?text=Image+Unavailable";
                    }}
                  />
                </a>
              ) : (
                <div className="w-full h-96 bg-gray-700 flex items-center justify-center text-white text-center rounded-t-xl">
                  <p>Content is not an image.</p>
                </div>
              )}
              <div className="px-6 py-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-bold text-white text-xl">{nasaData?.title}</h2>
                  <p className="text-gray-400 text-right">{nasaData?.date}</p>
                </div>
                <p className="text-gray-300 text-base">{nasaData?.explanation}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
