import type { WeatherResponse } from "../type/common";

export type CardType = {
  iconUrl: string;
  weatherLoading: boolean;
  weatherError: boolean;
  weatherData?: WeatherResponse;
};
export const Card = ({
  iconUrl,
  weatherLoading,
  weatherError,
  weatherData,
}: CardType) => {
  return (
    <>
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
    </>
  );
};
