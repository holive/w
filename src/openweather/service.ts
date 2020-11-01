import { openWeatherUrl } from '../../app/variables';
import { List, Openweather } from '@/openweather/api';
import { City } from '@/openweather/index';

export const getWeatherData = (lat: number, lng: number) => {
  const url = openWeatherUrl(lat, lng, 15, process.env.OPEN_WEATHER_SECRET);

  fetch(url)
    .then((res) => res.json())
    .then((res) => processResp(res))
    .catch((e) => console.warn(e.message));
};

const processResp = (res: Openweather) => {
  if (!res?.cod || res.cod !== '200' || !res.list?.length) {
    console.log('processResp: list not found');
    return;
  }

  const cities: Array<City> = [];

  res.list.forEach((v: List, i) => {
    const newCity: City = {
      id: v.id,
      name: v.name,
      main: v.main,
      weather: v.weather,
    };

    cities.push(newCity);
  });

  console.log('processResp', cities);
};
