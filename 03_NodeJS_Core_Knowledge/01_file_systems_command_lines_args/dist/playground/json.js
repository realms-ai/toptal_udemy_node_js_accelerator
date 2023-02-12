import fs from 'fs';
import path from 'path';
import url from 'url';
try {
    const space = '\n';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log('File Path: ', __filename);
    console.log('Directory Path: ', __dirname);
    console.log(space);
    const book = {
        title: 'Ego is the Enemy',
        author: 'Ryan Holiday',
    };
    const bookJSON = JSON.stringify(book);
    console.log('Book JSON: ', bookJSON);
    const parsedData = JSON.parse(bookJSON);
    console.log(parsedData.author);
    console.log(space);
    console.log('Storing data to JSON file');
    const fileName = `${__dirname}/data.json`;
    // fs.writeFileSync(fileName, bookJSON);
    console.log(space);
    console.log('Reading data from the file');
    const dataBuffer = fs.readFileSync(fileName);
    console.log('Data Buffer: ', dataBuffer);
    const dataJSON = dataBuffer.toString();
    console.log('Data Buffer as string: ', dataJSON);
    const data = JSON.parse(dataJSON);
    console.log('Title: ', data[0]?.title);
    let dataToBeModified;
    dataToBeModified = { ...data[1] };
    console.log('Data to be modified: ', dataToBeModified);
    dataToBeModified.name = 'Navpreet Singh';
    dataToBeModified.age = 30;
    data.push(dataToBeModified);
    let stringifyData = JSON.stringify(data);
    fs.writeFileSync(fileName, stringifyData);
}
catch (e) {
    console.log('Error Occured: ', e);
}
