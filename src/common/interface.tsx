export interface WeatherDataInterface {
    city: string ,
    description: string,
    temp: number,
    humidity: number,
    pressure: number,
    country: string,
    windSpeed: number,
    visibility: number,
    icon: string
}

export interface Location {
  longitude: number | null,
  latitude: number | null,
  city: string | null
}

export interface GraphData{
   dt_txt: string,
   main: {
    temp: number
   } 
}

export interface getDataInterface {
  (param1: string): undefined;
}




