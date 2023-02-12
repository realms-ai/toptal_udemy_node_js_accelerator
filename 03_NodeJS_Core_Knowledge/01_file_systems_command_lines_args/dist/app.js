// IMPORTS
import chalk from 'chalk';
import yargs from 'yargs';
import path from 'path';
import url from 'url';
import { readFile, appendData, getData, removeData, } from './playground/notes.js';
// CONSTANTS & VARIABLES
const space = '\n';
const defaultFileName = 'data.json';
let __dirname;
// FUNCTIONS
const processArgv = () => {
    const greetMsg = chalk.green.inverse.bold('Success');
    console.log('GreenMsg: ', greetMsg);
    const command = process.argv[2];
    // console.log('Command: ', command);
    switch (command) {
        case 'add':
            console.log(chalk.blue.inverse('Adding note'));
            break;
        case 'remove':
            console.log(chalk.red.inverse('Removing note'));
            break;
        default:
            console.log(chalk.yellow.inverse('Command not found'));
            break;
    }
};
const yargsArgv = () => {
    // Argument passing with yargs
    // node app.js add --title='To do list'
    // node app.js --help
    // node app.js --version
    console.log(space);
    const cmd = yargs(process.argv.slice(2));
    console.log('Yargs Commands: ');
    console.log(cmd.argv);
    // Create an add command
    // node app.js add
    // node app.js add --title='Shopping List'
    cmd.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string', // force user to provide title as STRING
            },
            body: {
                describe: 'Note description',
                demandOption: true,
                type: 'string', // force user to provide title as STRING
            },
            fileName: {
                describe: 'File Name',
                type: 'string',
            },
        },
        handler: (argv) => {
            console.log(space);
            console.log('Creating an add command');
            console.log(chalk.blue.inverse('Adding a new note!'), argv);
            appendData({ title: argv.title, body: argv.body }, argv.fileName);
        },
    });
    // Create an remove command
    // node app.js remove
    cmd.command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                type: 'string',
            },
            index: {
                describe: 'index of the note',
                type: 'number',
            },
            fileName: {
                describe: 'File Name',
                type: 'string',
            },
        },
        handler: (argv) => {
            console.log(space);
            console.log('Creating an remove command');
            console.log(chalk.red.inverse('Removing a note!'));
            removeData(argv.title, argv.index, argv.fileName);
        },
    });
    // Create an list command
    // node app.js list
    cmd.command({
        command: 'list',
        describe: 'list notes',
        builder: {
            fileName: {
                describe: 'File Name',
                type: 'string',
            },
        },
        handler: (argv) => {
            console.log(space);
            console.log('Created a List command');
            console.log(chalk.green.inverse('listing out all notes!'));
            console.log(readFile(argv.fileName));
        },
    });
    // Create an read command
    // node app.js read
    cmd.command({
        command: 'read',
        describe: 'read a note',
        builder: {
            index: {
                describe: 'index of the note',
                demandOption: true,
                type: 'number',
            },
            fileName: {
                describe: 'File Name',
                type: 'string',
            },
        },
        handler: (argv) => {
            console.log(space);
            console.log('Creating an read command');
            console.log(chalk.greenBright.inverse('Reading a note!'));
            console.log(getData(argv.index, argv.fileName));
        },
    });
    cmd.argv;
};
const arrowFunctions = () => {
    const event = {
        name: 'Navpreet Singh',
        printGuestList: function () {
            console.log(chalk.green.inverse.bold('(Old way) Guest list for ', this.name));
        },
        printGuestList_1() {
            console.log(chalk.green.inverse.bold('(New way) Guest list for ', this.name));
        },
        printGuestList_2: () => {
            console.log(chalk.green.inverse.bold('(Arrow function) Guest list for ', event.name));
        },
    };
    console.log(space);
    event.printGuestList();
    event.printGuestList_1();
    event.printGuestList_2();
    console.log(space);
    //
    // Goal: Create method to get incomplete tasks
    //
    // 1. Define getTasksToDo method
    // 2. Use filter to to return just the incompleted tasks (arrow function)
    // 3. Test your work by running the script
    const tasks = {
        tasks: [
            {
                text: 'Grocery shopping',
                completed: true,
            },
            {
                text: 'Clean yard',
                completed: false,
            },
            {
                text: 'Film course',
                completed: false,
            },
        ],
        getTasksToDo() {
            return this.tasks.filter((task) => !task.completed);
        },
    };
    console.log(space, chalk.yellow.inverse('Tasks to do'), tasks.getTasksToDo(), space);
};
const main = () => {
    const __filename = url.fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
    console.log('File Path: ', __filename);
    console.log('Directory Path: ', __dirname);
    console.log(space);
    arrowFunctions();
    processArgv();
    yargsArgv();
};
// Task to change name and age and append it to the file
const task1 = () => {
    // Fetching Data => Changing name and age  => Appending data back to file
    try {
        const data = readFile();
        if (typeof data === 'object') {
            // Changing name and age
            let dataToBeModified = Object.assign({}, data[1]);
            console.log('Data to be modified: ', dataToBeModified);
            dataToBeModified.name = 'Navpreet Singh';
            dataToBeModified.age = 30;
            // Append changed data to the file
            appendData(dataToBeModified);
        }
        else
            throw new Error();
    }
    catch (err) {
        console.log('Error Occurred: ' + err);
    }
};
// Executing the NODE file
try {
    main();
}
catch (e) {
    console.log('Error Occured in app.ts: ', e);
}
export { defaultFileName, __dirname as defaultDirectory };
