import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LeftPannel from "./Components/LeftPannel";
import Sidebar from "./Components/Sidebar";
import { WeatherDataInterface } from "./common/interface";

function App() {
  const [data, setData] = useState<WeatherDataInterface>({
    city: "",
    description: "",
    temp: 0,
    humidity: 0,
    pressure: 0,
    country: "",
    windSpeed: 0,
    visibility: 0,
    icon: "",
  });

  const getData = async (url: string) => {
    await axios
      .get(url)
      .then((res) => {
        setData({
          city: res.data.name,
          description: res.data.weather[0].description,
          temp: Math.round(res.data.main.temp),
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          country: res.data.sys.country,
          windSpeed: res.data.wind.speed,
          visibility: res.data.visibility,
          icon: res.data.weather[0].icon,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Internal Server Error. Please try again latter");
      });
  };

  useEffect(() => {
    const getURL = async () => {
      let url = "";
      const api = import.meta.env.VITE_REACT_APP_API_KEY;
      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api}&units=metric`;
              resolve();
            },
            (err) => {
              console.log(err);
              url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${api}&units=metric`;
              resolve();
            },
          );
        });
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${api}&units=metric`;
      }
      return url;
    };
    const getInitialData = async () => {
      const url = await getURL();
      getData(url);
    };
    getInitialData();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-[75%_25%]">
        <LeftPannel weather={data} getData={getData} />
        <Sidebar weather={data} className="hidde" />
      </div>
    </main>
  );
}

export default App;
