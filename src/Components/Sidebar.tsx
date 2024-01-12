import React from "react";
import { WeatherDataInterface } from "../common/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faWind } from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC<{ weather: WeatherDataInterface }> = ({ weather }) => {
  return (
    <div
      id="sidebar"
      className="hidden md:block py-[6rem] right-0 min-h-screen bg-[#3b5560] p-4 text-center text-white h-[100vh] overflow-hidden fixed w-[25%]"
    >
      <div className="bg-[white] rounded h-fit w-fit self-end m-auto">
        <img
          src={`https://openweathermap.org/img/w/${weather.icon}.png`}
          alt="Weather Icon"
        />
      </div>
      <p className="m-4">{weather.temp}° C</p>
      <div>
        <div>
          <div>
            WindSpeed: <FontAwesomeIcon icon={faWind} />{" "}
            <span className="mx-3 font-bold">{weather.windSpeed}</span>
          </div>
          <div>
            Visibility: <FontAwesomeIcon icon={faEye} />
            <span className="mx-3 font-bold">{weather.visibility}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
