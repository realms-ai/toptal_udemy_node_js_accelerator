// IMPORTS
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import url from 'url';
// CONSTANTS & VARIABLES
const space = '\n';
let defaultFileName;
let __dirname;
// FUNCTIONS
const readWeatherData = () => {
    var _a;
    const data = JSON.parse((_a = fs.readFileSync(defaultFileName)) === null || _a === void 0 ? void 0 : _a.toString());
    console.log(space, chalk.blue.inverse('Fetched Data: '), data, space);
    return data;
};
const storeWeatherData = (data) => {
    const storedDataFormat = JSON.stringify(data);
    fs.writeFileSync(defaultFileName, storedDataFormat);
    console.log(space, chalk.greenBright.inverse('Data Stored'));
};
const addWeatherData = async (weatherData) => {
    const storeCleanData = {
        lat: +weatherData.location.lat,
        lng: +weatherData.location.lon,
        placeName: weatherData.location.name,
        cleanData: {
            lat: +weatherData.location.lat,
            lng: +weatherData.location.lon,
            placeName: weatherData.location.name,
            temperature: +weatherData.current.temperature,
            feelsLike: +weatherData.current.feelslike,
            visibility: +weatherData.current.visibility,
            precipitation: +weatherData.current.precip,
            humidity: +weatherData.current.humidity,
        },
        rawData: weatherData,
    };
    // Get Data from DB
    const data = readWeatherData();
    const duplicateData = await data.find((d) => {
        // console.log(d.lat, ' ', lat, ' ', d.lng, ' ', lng);
        if (d.lat === storeCleanData.lat && d.lng === storeCleanData.lng)
            return d;
    });
    if (!duplicateData) {
        data.push(storeCleanData);
        storeWeatherData(data);
        console.log(space, chalk.yellow.inverse('Data added successfully'));
    }
    else {
        console.log(chalk.redBright.inverse('Data already stored in DB'));
    }
};
const findWeatherData = async (lat = 37.775, lng = -122.418, placeName) => {
    const data = await readWeatherData();
    let result;
    console.log(chalk.magenta.inverse('Finding the weather Data in DB'));
    if (placeName)
        result = await data.find((d) => d.placeName === placeName);
    else
        result = await data.find((d) => {
            // console.log(d.lat, ' ', lat, ' ', d.lng, ' ', lng);
            if (d.lat === lat && d.lng === lng)
                return d;
        });
    // console.log(chalk.blueBright.inverse('Data retrieved from db'), result);
    if (result === null || result === void 0 ? void 0 : result.lat) {
        return result.cleanData;
    }
    else
        return {};
};
const main = () => {
    const __filename = url.fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
    defaultFileName = __dirname + '/db-data/weather.json';
    console.log('File Path: ', __filename);
    console.log('Directory Path: ', __dirname);
    console.log(space);
};
// CODE WHICH RUNS ON EXECUTING THE FILE
main();
export { addWeatherData, findWeatherData };
