import openWeatherResponse from './openWeatherResponse.json';
import { deduplicate, processResp } from '../../../src/openweather/service';
import { Openweather } from '../../../src/openweather/api';

describe(`processResp`, () => {
  test(`if it returns null`, () => {
    const param1 = {} as Openweather;
    const param2 = { cod: '400' } as Openweather;
    const param3 = ({ cod: '200', res: { list: [] } } as unknown) as Openweather;

    expect(processResp(param1)).toBeNull();
    expect(processResp(param2)).toBeNull();
    expect(processResp(param3)).toBeNull();
  });
});

describe(`deduplicate`, () => {
  test(`if it returns the right response`, () => {
    const processedResponse = deduplicate(openWeatherResponse);

    expect(processedResponse.length).toBe(1);
    expect(
      processedResponse[0].main.temp_max === 295 && processedResponse[0].main.temp_min === 295,
    ).toBeTruthy();
  });

  test(`if it returns an empty array if there's no city name`, () => {
    const newWeatherResponse = { ...openWeatherResponse };
    newWeatherResponse.list[0].name = '';

    const processedResponse = deduplicate(newWeatherResponse);

    expect(processedResponse.length).toBe(0);
  });
});
