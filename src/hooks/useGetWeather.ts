import useSWR from "swr";
import type { WeatherResponse } from "../type/common";
export const useGetWeather = (
  lat: number | undefined,
  lon: number | undefined
) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const key =
    lat != null && lon != null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      : null;
  const { data, error, isLoading } = useSWR<WeatherResponse>(key, fetcher);
  return {
    data,
    isLoading,
    isError: Boolean(error),
  };
};
