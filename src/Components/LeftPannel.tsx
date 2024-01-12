import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HeadBar from "./HeadBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherDataInterface, getDataInterface } from "../common/interface";
import Graph from "./Graph";
import WeatherCard from "./WeatherCard";
import { useState } from "react";

const LeftPannel: React.FC<{
  weather: WeatherDataInterface;
  getData: getDataInterface;
}> = ({ weather, getData }) => {
  const [city, setCity] = useState("");
  const [newCity, setNewCity] = useState("");
  const api = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

  return (
    <div>
      <HeadBar weather={weather} />
      <div className="relative w-[80%] mx-auto my-8">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FontAwesomeIcon
            icon={faSearch}
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-3 w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-gray-500 outline-none"
          placeholder="Get Temperatures By City"
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              getData(url);
              setNewCity(city);
            }
          }}
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button
          type="submit"
          onClick={() => {
            getData(url), setNewCity(city);
          }}
          className="text-white absolute end-0 bottom-0 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-[13px] rounded-r-md dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-around my-4 w-full text-center">
        {Object.keys(weather)
          .slice(0, 5)
          .map((val, index) => {
            return (
              <WeatherCard key={index} weatherKey={val} value={weather[val]} />
            );
          })}
      </div>

      <Graph city={newCity} />
    </div>
  );
};

export default LeftPannel;
