import { useState } from "react";
import React from "react";
import { useGetWeather } from "./hooks/useGetWeather";
import { useGetCity } from "./hooks/useGetCity";

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
              placeholder="Enter city name"
              className="flex-1 px-5 py-3 bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-300 text-white px-7 py-3 font-bold hover:bg-blue-400 transition"
            >
              search
            </button>
          </form>
        </div>

        {/* 天気取得状態 */}
        {weatherLoading && <p>Loading…</p>}
        {weatherError && <p>Failed to get weather information</p>}
        {/* 天気情報 */}
        {weatherData && (
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
        )}
      </div>
    </div>
  );
}

export default App;
