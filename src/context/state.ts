import { userPosition } from '@/user';

export const initialState: Alerts = {
  userCoordinates: {
    coords: {
      latitude: -22.948829236207022,
      longitude: -43.21023170568746,
    },
  },
};

export default interface Alerts {
  userCoordinates: userPosition;
}
