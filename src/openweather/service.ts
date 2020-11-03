import { openWeatherUrl } from '../../app/variables';
import { List, Main, Openweather } from '@/openweather/api';
import { City } from '@/openweather/index';

export const getWeatherData = (
  lat: number,
  lng: number,
  saveWeatherData: (cities: Array<City>) => void,
) => {
  const url = openWeatherUrl(lat, lng, 15, process.env.OPEN_WEATHER_SECRET);

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const cities = processResp(res) || [];
      saveWeatherData(cities);
    })
    .catch((e) => console.warn(e.message));
};

export const processResp = (res: Openweather): Array<City> => {
  if (!res?.cod || res.cod !== '200' || !res.list?.length) {
    console.log('processResp: list not found');
    return null;
  }

  return deduplicate(res);
};

export const deduplicate = (res: Openweather): Array<City> => {
  const cities: Array<City> = [];
  const cityNames: { [key: string]: null } = {};

  res.list.forEach((v: List, i) => {
    if (cityNames[v.name] === null || !v.name) return;
    cityNames[v.name] = null;

    const newCity: City = {
      id: v.id,
      name: v.name,
      main: formatWeather(v.main),
      weather: v.weather,
      coord: v.coord,
    };

    cities.push(newCity);
  });

  return cities;
};

const formatWeather = (main: Main): Main => {
  const newMain = { ...main };
  newMain.temp_min = Math.round(main.temp_min);
  newMain.temp_max = Math.round(main.temp_max);
  return newMain;
};
