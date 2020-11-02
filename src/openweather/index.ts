import { Coord, Main, Weather } from '@/openweather/api';

export interface City {
  id: number;
  name: string;
  main: Main;
  weather: Weather[];
  coord: Coord;
}
