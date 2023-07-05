Weather App
Built using Next.js, OpenWeatherMap API, Google Maps, Google Autocomplete and Geolocation API.
The user can:
* See a map and place a pin on it;
* Click on the search button to search the weather condition of the pin location;
* Select a city on the sidebar list to see the weather condition;
* Select a city point on the map to see the weather condition;
* On desktop, search a place by typing a name on the search bar;

git clone git@github.com:holive/w.git
cd weather-app
yarn install

MAPS_SECRET=[GOOGLE-MAPS-SECRET] OPEN_WEATHER_SECRET=[OPEN-WEATHER-SECRET] yarn build
yarn start