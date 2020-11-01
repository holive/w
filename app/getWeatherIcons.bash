#!/bin/bash
for i in 01d 01n 02d 02n 03d 03n 04d 04n 05d 05n 06d 06n 07d 07n 08d 08n 09d 09n 10d 10n 11d 11n 13d 13n 50d 50n; do
  echo "counter: $i"
  curl https://openweathermap.org/img/wn/$i@2x.png -o ../public/w/$i@2x.png -s
done
