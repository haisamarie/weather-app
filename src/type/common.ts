export type LocalNames = {
  [languageCode: string]: string;
};

export type CityGeo = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type DirectGeocodingResponse = CityGeo[];

export type Coord = {
  lon: number;
  lat: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type Clouds = {
  all: number;
};

export type Sys = {
  country: string;
  sunrise: number;
  sunset: number;
};

export type WeatherResponse = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
