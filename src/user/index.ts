export interface userPosition {
  coords: {
    latitude: number | undefined;
    longitude: number | undefined;
  };
}

export const initGeolocation = (
  setLatLong: (position: userPosition) => void,
) => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(setLatLong, () =>
      console.warn('Could not obtain location'),
    );
};
