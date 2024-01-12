import React, { useState, useEffect } from "react";
import { WeatherDataInterface } from "../common/interface";
import country from "../common/countryname";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";

// This is the top Head of the application
const HeadBar: React.FC<{ weather: WeatherDataInterface }> = ({ weather }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID); // Cleanup on unmount
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = ("0" + time.getMinutes()).slice(-2);
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(time);

  function getGreeting() {
    const hour = time.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else if (hour >= 18 && hour < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }

  return (
    <div id="headbar" className="p-4 m-4 rounded-md text-white font-medium">
      <div className="flex justify-between">
        <span className="text-2xl">{getGreeting()}</span>
        <span className="border bg-[#6f7f8ac2] border-black p-1 rounded">
          <FontAwesomeIcon icon={faLocationDot} className="mx-2" />
          {weather.city}, {country[weather.country]}
        </span>
      </div>
      <div className="mt-[4rem]">
        <div className="text-6xl">
          {hours}:{minutes} {ampm}
        </div>
        <span>{formattedDate}</span>
      </div>
      <div className="mt-[2rem] flex justify-between">
        <div>
          <span className="text-xl">Weather Forecast</span>
          <div>Todays wether is {weather.description}</div>
        </div>
        <div className="bg-[white] rounded h-fit self-end">
          <img
            src={`https://openweathermap.org/img/w/${weather.icon}.png`}
            alt="Weather Icon"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadBar;
