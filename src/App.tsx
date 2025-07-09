import { useState } from "react";
import React from "react";
import useSWR from "swr";

type CityType = {
  lat: number;
  lon: number;
};
type WeatherLite = {
  name: string;
  id: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
};
//都市名から緯度、経度を取得する関数。
const useGetCity = (city: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const key = city
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    : null;

  const { data } = useSWR<CityType[]>(key, fetcher);
  return {
    data: data?.[0],
  };
};
//緯度、経度から天気を取得する関数。
const useGetWeather = (lat: number | undefined, lon: number | undefined) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const key =
    lat != null && lon != null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      : null;
  const { data, error, isLoading } = useSWR<WeatherLite>(key, fetcher);
  return {
    data,
    isLoading,
    isError: Boolean(error),
  };
};

function App() {
  const [inputCity, setInputCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const { data: cityData } = useGetCity(searchCity);
  const lat = cityData?.lat;
  const lon = cityData?.lon;
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useGetWeather(lat, lon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(inputCity.trim());
  };

  const iconCode = weatherData?.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="App">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="w-full max-w-sm mb-6">
          <form
            onSubmit={handleSubmit}
            className="flex shadow-md rounded-full overflow-hidden bg-white"
          >
            <input
              onChange={handleChange}
              value={inputCity}
              type="text"
              placeholder="都市名を入力"
              className="flex-1 px-5 py-3 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
            <button
              onClick={() => {}}
              type="submit"
              className="bg-blue-300 text-white px-7 py-3 font-bold hover:bg-blue-400 transition"
            >
              検索
            </button>
          </form>
        </div>

        {/* 天気取得状態 */}
        {weatherLoading && <p>天気情報を取得中…</p>}
        {weatherError && <p>天気情報の取得に失敗しました</p>}

        <div className="bg-white rounded-3xl shadow-xl px-10 py-8 flex flex-col items-center w-full max-w-xs">
          <div className="text-lg font-bold text-blue-600 mb-2">
            {weatherData?.name}
          </div>
          {weatherData?.weather.map((item) => (
            <div key={item.id}>
              <img
                src={iconUrl}
                alt={weatherData.weather[0].description}
                width={100}
                height={100}
              />
              <div className="text-4xl font-bold text-gray-700 mb-2">
                {weatherData.main.temp.toFixed(1)}°C
              </div>
              <div className="text-base text-gray-500 tracking-wide text-center">
                {item.main}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
