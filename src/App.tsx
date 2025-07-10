import { useState } from "react";
import React from "react";
import { useGetWeather } from "./hooks/useGetWeather";
import { useGetCity } from "./hooks/useGetCity";
import { Card } from "./components/Card";
import { Form } from "./components/Form";

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
          <Form
            value={inputCity}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <Card
          iconUrl={iconUrl}
          weatherLoading={weatherLoading}
          weatherError={weatherError}
          weatherData={weatherData}
        />
      </div>
    </div>
  );
}

export default App;
