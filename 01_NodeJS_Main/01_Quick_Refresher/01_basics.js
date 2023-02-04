let space = '\n';
// Use of FILE SYSTEM module to create a file and write ot it
const fs = require('fs');

fs.writeFileSync('01_test.txt', 'Hi There');
fs.writeFileSync('01_test.txt', 'Hi There again');

console.log(space, '*** Ojects, properties and methods ***');
// *** Complex objects, properties and methods ***
const person = {
  name: 'Max',
  age: 29,
  greet: () => {
    console.log('HI, I am', this.name); //Don't work due to wrong syntax
  },
  greet_1: function () {
    console.log('HI, I am', this.name);
  },
  greet_2() {
    console.log('HI, I am', this.name);
  },
};

person.greet();
person.greet_1();
person.greet_2();

console.log(space, '*** Arrays and Arrays Methods ***');
// *** Arrays and Array Methods ***
const hobbies = ['sports', 'cooking'];
for (let hobby of hobbies) console.log(hobby);
console.log(
  '1. ',
  hobbies.map((hobby) => {
    return `Hobby: ${hobby}`;
  })
);
console.log(
  '2. ',
  hobbies.map((hobby) => `Hobby: ${hobby}`)
);
console.log('3. ', hobbies);

// adding a element to CONST array
hobbies.push('Programming');
console.log('4. ', hobbies);
// This happens because we didn't change the address of the const but change the value in the address
// This usually happens with reference types (Immutable types)
const copiedArray = hobbies.slice();
console.log('5. ', copiedArray);

// Spread Operator (used to copy reference types)
const copiedArray_1 = [...hobbies];
console.log('6. Example of SPREAD Operator: ', copiedArray_1);

// Rest operator (used to take multiple inputs in the function)
const hobbies_1 = (hobby_1, hobby_2, ...hobby_n) => {
  console.log(`7. Example of REST operator
  Hobby 1: ${hobby_1}
  Hobby_2: ${hobby_2}
  Rest of the hobbies(REST operator): ${hobby_n}`);
};

hobbies_1('swimming', 'cricket', 'gymming', 'karate', 'cycling');

// *** Object De-structuring ***
console.log(space, '*** Destructuring ***');
const printName = (personData) => {
  console.log('Name: ', personData.name);
};
printName(person);

const printName_1 = ({ name, greet_2 }) => {
  console.log('1. Name: ', name);
  console.log('Greet: ', greet_2());
};
printName_1(person);

const { name, age } = person;
console.log('2. name: ', name, '\n age: ', age);

const [hobby_1, hobby_2] = hobbies;
console.log('3. Hobby_1: ', hobby_1, '\nHobby_2: ', hobby_2);

// ***Async Code and Promises
console.log(space, '*** Async code and Promises ***');
const fetchData = (callback) => {
  setTimeout(() => {
    callback('Done!');
  }, 1500);
};

setTimeout(() => {
  console.log('Timer is ON');
  fetchData((text) => {
    console.log(text);
  });
}, 2000);

console.log('Hello!');
console.log('Hi!');

// Using Promise
console.log('Using Promise');
const getData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done again!');
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log('2nd Timer is ON');
  getData()
    .then((text) => {
      console.log(text);
      return getData();
    })
    .then((text) => {
      console.log('Nested Callback', text);
    });
}, 2000);

// Template Literals
// Use of `` to write strings
const text = 'Text';
console.log(`${space} Printing a message(Template Literals): ${text}`);
