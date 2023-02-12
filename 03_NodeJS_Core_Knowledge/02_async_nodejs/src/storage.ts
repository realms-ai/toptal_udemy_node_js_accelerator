// IMPORTS
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import url from 'url';

// INTERFACES
interface RawData {
  request: object;
  location: {
    name: string;
    lat: string;
    lon: string;
  };
  current: {
    temperature: number;
    feelslike: number;
    visibility: number;
    precip: number;
    humidity: number;
  };
}

interface QueryData {
  lat: number;
  lng: number;
  placeName: string;
}

interface CleanData extends QueryData {
  temperature: number;
  feelsLike: number;
  visibility: number;
  precipitation: number;
  humidity: number;
}

interface StoredCleanData extends QueryData {
  cleanData: CleanData;
  rawData: RawData;
}

// CONSTANTS & VARIABLES
const space = '\n';
let defaultFileName: string;
let __dirname: string;

// FUNCTIONS

const readWeatherData = (): StoredCleanData[] => {
  const data: StoredCleanData[] = JSON.parse(
    fs.readFileSync(defaultFileName)?.toString()
  );
  console.log(space, chalk.blue.inverse('Fetched Data: '), data, space);
  return data;
};

const storeWeatherData = (data: StoredCleanData[]): void => {
  const storedDataFormat = JSON.stringify(data);
  fs.writeFileSync(defaultFileName, storedDataFormat);
  console.log(space, chalk.greenBright.inverse('Data Stored'));
};

const addWeatherData = async (weatherData: RawData): Promise<void> => {
  const storeCleanData: StoredCleanData = {
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
  const data: StoredCleanData[] = readWeatherData();
  const duplicateData = await data.find((d) => {
    // console.log(d.lat, ' ', lat, ' ', d.lng, ' ', lng);
    if (d.lat === storeCleanData.lat && d.lng === storeCleanData.lng) return d;
  });
  if (!duplicateData) {
    data.push(storeCleanData);
    storeWeatherData(data);
    console.log(space, chalk.yellow.inverse('Data added successfully'));
  } else {
    console.log(chalk.redBright.inverse('Data already stored in DB'));
  }
};

const findWeatherData = async (
  lat: number = 37.775,
  lng: number = -122.418,
  placeName?: string
): Promise<CleanData | object> => {
  const data: StoredCleanData[] = await readWeatherData();
  let result: StoredCleanData | undefined;
  console.log(chalk.magenta.inverse('Finding the weather Data in DB'));
  if (placeName) result = await data.find((d) => d.placeName === placeName);
  else
    result = await data.find((d) => {
      // console.log(d.lat, ' ', lat, ' ', d.lng, ' ', lng);
      if (d.lat === lat && d.lng === lng) return d;
    });
  // console.log(chalk.blueBright.inverse('Data retrieved from db'), result);
  if (result?.lat) {
    return result.cleanData;
  } else return {};
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

export { RawData, CleanData, addWeatherData, findWeatherData };
