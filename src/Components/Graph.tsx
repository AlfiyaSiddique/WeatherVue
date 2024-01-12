import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { GraphData } from "../common/interface";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Analysis',
      },
    },
  };

const Graph: React.FC<{city: string}>= ({city}) => {
  const [graphData, setGraphData] = useState<[GraphData] | []>([]);
  const api = import.meta.env.VITE_REACT_APP_API_KEY;
  
  const getData = async (url: string) => {
    await axios.get(url)
    .then((res)=>{
      setGraphData(res.data.list)
    })
    .catch((err)=>{
      console.log(err)
      alert("Internal Server Error. Please try again latter")
    })
  };

  useEffect(()=>{
    if(city !== "") getData(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`)
  }, [city])

  useEffect(() => {
    const getURL = async () => {
      if (navigator.geolocation) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              getData(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${api}&units=metric`);
              resolve();
            },
            (err) => {
              console.log(err);

              getData(`https://api.openweathermap.org/data/2.5/forecast?q=Mumbai&appid=${api}`);
              resolve();
            }
          );
        });
      } else {
        getData(`http://api.openweathermap.org/data/2.5/forecast?q=Mumbai&appid=${api}&units=metric`);
      }
    };

    getURL()
  }, []);
  

  const chartData = {
    labels: graphData.map((entry) => entry.dt_txt.slice(0,10)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: graphData.map((entry) => entry.main.temp),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return <div className="mx-auto w-[90%] bg-[whitesmoke] my-4 rounded-md">{graphData && <Line data={chartData} options={options}/>}</div>;
};

export default Graph;
