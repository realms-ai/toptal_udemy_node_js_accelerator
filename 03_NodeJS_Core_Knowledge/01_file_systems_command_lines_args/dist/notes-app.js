const space = '\n';
import chalk from 'chalk';
console.log(space);
const greetMsg = chalk.green.inverse.bold('Success');
console.log('GreenMsg: ', greetMsg);
const command = process.argv[2];
console.log('Command: ', command);
switch (command) {
    case 'add':
        console.log('Adding note');
        break;
    case 'remove':
        console.log('Removing note');
        break;
    default:
        console.log('Command not found');
        break;
}
// Argument passing with yargs
// node app.js add --title='To do list'
// node app.js --help
// node app.js --version
import yargs from 'yargs';
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
    },
    handler: (argv) => {
        console.log(space);
        console.log('Creating an add command');
        console.log('Adding a new note!', argv);
    },
});
// Create an remove command
// node app.js remove
cmd.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: () => {
        console.log(space);
        console.log('Creating an remove command');
        console.log('Removing a note!');
    },
});
// Create an list command
// node app.js list
cmd.command({
    command: 'list',
    describe: 'list notes',
    handler: () => {
        console.log(space);
        console.log('Created a List command');
        console.log('listing out all notes!');
    },
});
// Create an read command
// node app.js read
cmd.command({
    command: 'read',
    describe: 'read a note',
    handler: () => {
        console.log(space);
        console.log('Creating an read command');
        console.log('Reading a note!');
    },
});
cmd.argv;
