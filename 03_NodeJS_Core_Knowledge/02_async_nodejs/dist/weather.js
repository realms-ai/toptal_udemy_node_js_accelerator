// IMPORTS
import axios from 'axios';
import chalk from 'chalk';
import { addWeatherData, findWeatherData, } from './storage.js';
// INTERFACES
// CONSTANTS & VARIABLES
const space = '\n';
const accessKey = process.env['WEATHER_API'];
const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${accessKey}&query=`;
// FUNCTIONS
const getWeatherFromAPI = async (lat = 37.775, lng = -122.418, placeName) => {
    let resp = {};
    let respData;
    console.log(space, chalk.red.inverse('Response from URL'));
    try {
        if (placeName) {
            placeName = placeName.replace(' ', '%20');
            console.log(space, chalk.bgBlue('URL: ', `${weatherApiUrl}${placeName}`));
            resp = await axios.get(`${weatherApiUrl}${placeName}`);
        }
        else {
            console.log(space, chalk.bgBlue('URL: ', `${weatherApiUrl}${lat},${lng}`));
            resp = await axios.get(`${weatherApiUrl}${lat},${lng}`);
        }
        if ('data' in resp) {
            console.log('Response: ', resp.data);
            respData = resp.data;
            if ('current' in respData)
                addWeatherData(respData);
            return respData;
        }
        else
            return {};
    }
    catch (err) {
        console.log('Unable to connect to the server');
        throw Error();
    }
};
const getWeatherData = async (lat = 37.775, lng = -122.418, placeName) => {
    let result = await findWeatherData(lat, lng, placeName);
    console.log(space, 'Result from DB find: ', result);
    if (!('lat' in result)) {
        let data = await getWeatherFromAPI(lat, lng, placeName);
        if ('current' in data) {
            result = {
                lat: +data.location.lat,
                lng: +data.location.lon,
                placeName: data.location.name,
                temperature: +data.current.temperature,
                feelsLike: +data.current.feelslike,
                visibility: +data.current.visibility,
                precipitation: +data.current.precip,
                humidity: +data.current.humidity,
            };
        }
        console.log('Result from URL find: ', result);
    }
    return result;
};
// const getWeatherDataWithCallback = (
//   lat: number = 37.775,
//   lng: number = -122.418,
//   placeName?: string,
//   callback: Function
// ): void => {
//   let result: CleanData | object = await findWeatherData(lat, lng, placeName);
//   console.log(space, 'Result from DB find: ', result);
//   if (!('lat' in result)) {
//     let data: RawData | object = await getWeatherFromAPI(lat, lng, placeName);
//     if ('current' in data) {
//       result = {
//         lat: +data.location.lat,
//         lng: +data.location.lon,
//         placeName: data.location.name,
//         temperature: +data.current.temperature,
//         feelsLike: +data.current.feelslike,
//         visibility: +data.current.visibility,
//         precipitation: +data.current.precip,
//         humidity: +data.current.humidity,
//       };
//     }
//     console.log('Result from URL find: ', result);
//   }
//   return result;
// };
// CODE WHICH RUNS ON EXECUTING THE FILE
// EXPORTS RELEVANT FUNCTIONS & PARAMETERS
export { getWeatherData };
