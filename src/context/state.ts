import { userPosition } from '@/user';
import { City } from '@/openweather';

export const initialState: Alerts = {
  userCoordinates: {
    coords: {
      latitude: -22.948829236207022,
      longitude: -43.21023170568746,
    },
  },
  cities: undefined,
};

export default interface Alerts {
  userCoordinates: userPosition;
  cities: Array<City> | undefined;
}
