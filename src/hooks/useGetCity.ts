import useSWR from "swr";
import type { CityGeo } from "../type/common";
export const useGetCity = (city: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const key = city
    ? `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    : null;

  const { data } = useSWR<CityGeo[]>(key, fetcher);
  return {
    data: data?.[0],
  };
};
