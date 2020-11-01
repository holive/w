export const APP_TITLE = 'Weather';

export const openWeatherUrl = (lat: number, lng: number, count: number, secret: string): string =>
  `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=${count}&APPID=${secret}&units=metric`;

export const weatherIconUrl = (icon: string): string => `/w/${icon}@2x.png`;
