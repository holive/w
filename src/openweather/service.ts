import { openWeatherUrl } from '../../app/variables';
import { List, Openweather } from '@/openweather/api';
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
      let cities = processResp(res);
      if (!cities) cities = [];

      saveWeatherData(cities);
    })
    .catch((e) => console.warn(e.message));
};

const processResp = (res: Openweather): Array<City> => {
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
    if (cityNames[v.name] === null) return;
    cityNames[v.name] = null;

    const newCity: City = {
      id: v.id,
      name: v.name,
      main: v.main,
      weather: v.weather,
      coord: v.coord,
    };

    cities.push(newCity);
  });

  return cities;
};
