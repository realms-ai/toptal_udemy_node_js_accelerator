// IMPORTS
import fs from 'fs';
import { defaultFileName, defaultDirectory } from '../app.js';
// CONSTANTS & VARIABLES
const space = '\n';
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
};
// FUNCTIONS
const main = () => { };
const readFile = (file = defaultFileName) => {
    try {
        console.log(space);
        console.log('Reading data from the file');
        const filePath = `${defaultDirectory}/db-data/${file}`;
        console.log('FilePath: ', filePath);
        const dataBuffer = fs.readFileSync(filePath);
        console.log('Data Buffer: ', dataBuffer);
        const dataJSON = dataBuffer.toString();
        console.log('Data Buffer as string: ', dataJSON);
        const data = JSON.parse(dataJSON);
        return data;
    }
    catch (err) {
        return [];
    }
};
const getData = (index, file) => {
    console.log(space);
    console.log('Getting certain element from the file');
    try {
        const data = readFile(file);
        return data[index];
    }
    catch (err) {
        return 'Error Occurred: ' + err;
    }
};
const removeData = (title, index = 0, file) => {
    console.log(space);
    console.log('Removing certain element from the file');
    try {
        const data = readFile(file);
        if (title)
            index = data.findIndex((d) => d.title === title);
        console.log('Data: ', data, '\nIndex: ', index);
        if (index >= 0) {
            data.splice(index, 1);
            console.log('Note found');
            console.log('New Data to be stored: ', data);
            storeData(data, file);
        }
        else
            console.log('No note found');
    }
    catch (err) {
        console.log('Error Occurred: ' + err);
    }
};
const appendData = (data, file) => {
    console.log(space);
    console.log('Append data to the file');
    try {
        const jsonData = readFile(file);
        // Not allowing duplicate data in the file
        const duplicateData = jsonData.find((d) => d.title === data.title);
        if (duplicateData)
            console.log('Title already exist');
        else {
            jsonData.push(data);
            storeData(jsonData, file);
        }
    }
    catch (err) {
        console.log('Error Occurred: ' + err);
    }
};
const storeData = (data, file = defaultFileName) => {
    console.log(space);
    console.log('Store data to the file');
    const stringifyData = JSON.stringify(data);
    const filePath = `${defaultDirectory}/db-data/${file}`;
    try {
        fs.writeFileSync(filePath, stringifyData);
    }
    catch (err) {
        console.log('Error Occurred: ' + err);
    }
};
const changeData = (data, index = 0, file) => {
    console.log(space);
    console.log('Change data in the file at a certain index');
    try {
        const jsonData = readFile(file);
        jsonData[index] = data;
        storeData(jsonData, file);
    }
    catch (err) {
        console.log('Error Occurred: ' + err);
    }
};
try {
    // Displaying filename and dirname
    main();
}
catch (e) {
    console.log('Error Occured in notes.ts: ', e);
}
export { readFile, removeData, getData, appendData, storeData, changeData, };
