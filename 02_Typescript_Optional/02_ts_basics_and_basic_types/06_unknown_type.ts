// UNKNOWN TYPE
let userInput: unknown;
let username: string;
let userIn: any;

userInput = 5;
userInput = 'Max';
// Below gives an error because UNKNOWN is not a STRING type
// userName = userInput;
// Have to add a check to make the STRING variable equal to UNKNOWN variable
if (typeof userInput === 'string') {
  username = userInput;
}

// But string could be of ANY type
username = userIn;
