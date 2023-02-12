// IMPORTS
import axios from 'axios';
import chalk from 'chalk';
import https from 'node:https';
// CONSTANTS & VARIABLES
const space = '\n';
const accessKey = process.env['MAPBOX_ACCESS_KEY'];
const weatherApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
// FUNCTIONS
const getGeoLocation = async (name) => {
    const geoUrl = `${weatherApiUrl}${name}.json?access_token=${accessKey}&limit=1`;
    let lat = 0, lng = 0;
    console.log(space, chalk.green.inverse('Geo URL: '), geoUrl);
    try {
        const resp = await axios.get(geoUrl);
        // console.log(space, 'Geo Raw Data: ', resp);
        let respBody = {};
        if ('data' in resp) {
            respBody = await resp.data;
            if ('features' in respBody) {
                const location = await respBody.features[0];
                if ('center' in location)
                    [lng, lat] = await (location === null || location === void 0 ? void 0 : location.center);
            }
        }
        return { lat: lat, lng: lng };
    }
    catch (e) {
        console.log('Unable to connect to the server');
        throw Error();
    }
};
const getGeoLocationWithCallback = (name, callback) => {
    const geoUrl = `${weatherApiUrl}${name}.json?access_token=${accessKey}&limit=1`;
    let lat = 0, lng = 0;
    // Destructure axios call
    axios.get(geoUrl).then(({ data }) => {
        const resp = data;
        const { features } = resp;
        console.log(chalk.cyan.inverse('Response Data with callback destructuring: '), resp);
    });
    axios
        .get(geoUrl)
        .then((response) => {
        const resp = response.data;
        if (resp.features.length === 0)
            callback('Invalid query. Search with another name');
        else {
            [lng, lat] = resp.features[0].center;
            callback(undefined, { lat: lat, lng: lng });
        }
    })
        .catch((error) => {
        callback('Unable to reach the server. Please try again after some time.');
    });
};
// Using NodeJS default http module to make a request
const getGeoLocationWithNodeHttp = (name) => {
    const geoUrl = `${weatherApiUrl}${name}.json?access_token=${accessKey}&limit=1`;
    const options = new URL(geoUrl);
    const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        let readableData;
        res.on('data', (d) => {
            console.log('Buffer Response Data: ', d);
            console.log('Convert Buffer to String');
            readableData = d.toString();
        });
        res.on('end', () => {
            console.log('String Data: ', readableData);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
};
const main = () => {
    console.log('Access Token: ', accessKey);
    getGeoLocationWithNodeHttp('New York');
};
// CODE WHICH RUNS ON EXECUTING THE FILE
main();
export { getGeoLocation, getGeoLocationWithCallback };
