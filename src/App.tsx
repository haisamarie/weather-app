import { WiDaySunny } from "react-icons/wi";
import { useState } from "react";
import React from "react";
import useSWR from "swr";

type data = {
  id: number;
  name: string;
  temperature: string;
  condition: string;
};

const TEST_DATA: data[] = [
  {
    id: 1,
    name: "東京",
    temperature: "28°C",
    condition: "晴れ",
  },
];

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const lat = 35.6895; // 東京の緯度
  const lon = 139.6917; // 東京の経度
  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    fetcher
  );

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(TEST_DATA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  console.log(data, "data");

  return (
    <div className="App">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="w-full max-w-sm mb-6">
          <form className="flex shadow-md rounded-full overflow-hidden bg-white">
            <input
              onChange={handleChange}
              value={city}
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

        {weather.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl px-10 py-8 flex flex-col items-center w-full max-w-xs"
            >
              <div className="text-lg font-bold text-blue-600 mb-2">
                {item.name}
              </div>
              <WiDaySunny size={100} color="orange" />

              <div className="text-4xl font-bold text-gray-700 mb-2">
                {item.temperature}
              </div>
              <div className="text-base text-gray-500 tracking-wide">
                {item.condition}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
