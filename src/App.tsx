import { WiDaySunny } from "react-icons/wi";
import { useState } from "react";
import React from "react";

function App() {
  const [city, setCity] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
        {/* 検索バー */}

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

        {/* 天気カード */}
        <div className="bg-white rounded-3xl shadow-xl px-10 py-8 flex flex-col items-center w-full max-w-xs">
          <div className="text-lg font-bold text-blue-600 mb-2">東京</div>
          {/* 天気アイコン（例：晴れ） */}
          <WiDaySunny size={100} color="orange" />

          <div className="text-4xl font-bold text-gray-700 mb-2">28°C</div>
          <div className="text-base text-gray-500 tracking-wide">晴れ</div>
        </div>
      </div>
    </div>
  );
}

export default App;
