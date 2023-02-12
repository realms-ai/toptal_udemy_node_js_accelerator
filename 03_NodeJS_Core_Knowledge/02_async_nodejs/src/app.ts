// IMPORTS
import chalk from 'chalk';
import yargs from 'yargs';

import { getWeatherData } from './weather.js';
import {
  GeoCleanData,
  getGeoLocation,
  getGeoLocationWithCallback,
} from './geocoding.js';

// INTERFACES
interface Product {
  label: string;
  price: number;
  stock: number;
  salesPrice: undefined | number;
  rating: number;
}

// CONSTANTS & VARIABLES
const space = '\n';

// FUNCTIONS

const yargsArgv = () => {
  // Argument passing with yargs
  // node app.js add --title='To do list'
  // node app.js --help
  // node app.js --version

  console.log(space);
  const cmd = yargs(process.argv.slice(2));
  console.log('Yargs Commands: ');
  console.log(cmd.argv);

  // Create a weather command
  cmd.command({
    command: 'weather',
    describe: 'find weather of a place',
    builder: {
      lat: {
        describe: 'Latitude of the place',
        type: 'number',
      },
      lng: {
        describe: 'Longitude of the place',
        type: 'number',
      },
      placeName: {
        describe: 'Name of the place',
        type: 'string',
      },
    },
    handler: async (argv): Promise<void> => {
      const data = await getWeatherData(argv.lat, argv.lng, argv.placeName);
      console.log(space, chalk.blueBright.inverse('Weather Data'), space, data);
    },
  });

  // Create a location command
  cmd.command({
    command: 'location',
    describe: 'find geo-coordinates of a place',
    builder: {
      name: {
        describe: 'name of the place',
        demandOption: true,
        type: 'string',
      },
    },
    handler: async (argv): Promise<void> => {
      try {
        // Destructuring ** geoCallbackData **
        getGeoLocationWithCallback(
          argv.name,
          async (
            error: string,
            geoCallbackData: Partial<GeoCleanData> = {},
            // OR do it with destructuring
            { lat, lng }: Partial<GeoCleanData> = {}
          ) => {
            if (error) console.log(error);
            else {
              console.log('Callback GeoLocation Coordintes: ', geoCallbackData);
              const weatherData = await getWeatherData(
                geoCallbackData.lat,
                geoCallbackData.lng
              );
              console.log(
                space,
                chalk.blueBright.inverse('Callback Weather Data'),
                space,
                weatherData
              );
            }
          }
        );
        const goeData: Partial<GeoCleanData> = await getGeoLocation(argv.name);
        console.log(
          space,
          chalk.blueBright.inverse('Location Geo-Coordinates Detail'),
          space,
          goeData
        );
        if ('lat' in goeData) {
          const weatherData = await getWeatherData(goeData.lat, goeData.lng);
          console.log(
            space,
            chalk.blueBright.inverse('Weather Data'),
            space,
            weatherData
          );
        }
      } catch (err) {
        console.log('Something is broken. Please try after some time.');
      }
    },
  });
  cmd.argv;
};

const onlineCompiler = (): void => {
  const listLocations = (locations: string[]): void => {
    console.log(space, chalk.green.inverse('Locations: ', locations));
    for (let location of locations)
      console.log(space, chalk.red.inverse('Location: ', location));
    console.log(space);
  };

  const myLocations = ['Philly', 'NYC'];

  listLocations(myLocations);
};

const asyncTest = () => {
  console.log(space, chalk.green.inverse('Starting'));

  setTimeout(() => {
    console.log(space, chalk.yellow.inverse('2 second timer'), space);
  }, 2000);

  setTimeout(() => {
    console.log(space, chalk.cyan.inverse('1 second timer'));
  }, 1000);

  setTimeout(() => {
    console.log(space, chalk.magenta.inverse('0 second timer'));
  }, 0);

  console.log(space, chalk.red.inverse('Stopping'));
};

const callBack = () => {
  // callback in a function returns the value when it is available
  const test = (): void => {
    setTimeout((): string => {
      const data = 'Hi There';
      return data;
    }, 2000);
  };

  console.log('Test Callback (will return undefined): ', test());

  const workingTest = (callback: Function) => {
    setTimeout((): void => {
      const data = 'Hi There';
      callback(data);
    }, 2000);
  };
  workingTest((data: string): void => {
    console.log('Working Test Callback (will return value): ', data);
  });

  const callbackAdd = (a: number, b: number, callback: Function): void => {
    setTimeout(() => {
      callback(a + b);
    }, 2000);
  };
  callbackAdd(5, 6, (result: number): void => {
    console.log('Result of Sum: ', result);
  });
};

const destructuring = () => {
  const product: Product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salesPrice: undefined,
    rating: 4.2,
  };
  const { price, stock }: Partial<Product> = product;
  console.log(space, 'Price: ', price, space, 'Stock: ', stock);

  const transaction = (type: string, { label, stock }: Partial<Product>) => {
    console.log(
      space,
      'Type: ',
      type,
      space,
      'Label: ',
      label,
      space,
      'Stock: ',
      stock
    );
  };
  transaction('order', product);

  let a: { lat: number; lng: number } = { lat: 0, lng: 0 };
  [a.lng, a.lat] = [23, 54];
  console.log('Co-ordinates: ', a);
};

const main = async () => {
  // Comment all other functions to check the functionality of each function
  asyncTest();
  onlineCompiler();
  yargsArgv();
  callBack();
  destructuring();
};

// CODE WHICH RUNS ON EXECUTING THE FILE
try {
  main();
} catch (err) {
  console.log('Error Occurred: ', err);
}
