const space = '\n';

interface Person {
  name: string;
  age: number;

  greet: (phrase: string) => void;
  greet_1(phrase: string): void;
}

let user1 = {
  name: 'Navpreet',
  age: 30,
  greet: (phrase: string) => {
    console.log('Phrase: ', phrase);
  },
  greet_1(phrase: string) {
    console.log('Phrase: ', phrase);
  },
};

user1.greet('Hi there - I am Navpreet Singh');

// *** Using Interfaces with Classes
// 1. Readonly keys which will be initialized only once
// 2. No PUBLIC/PRIVATE/PROTECTED keys
console.log(space, 'Interfaces with Classes');
interface Greetable {
  readonly name: string;
  greet: (phrase: string) => void;
  greet_1(phrase: string): void;
}

interface Customer {
  age: number;
  gender: string;
}

class Person implements Greetable, Customer {
  name: string;
  age: number;
  gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  greet = (phrase: string): void => {
    console.log(`Hi ${this.name},\n ${phrase}`);
  };

  greet_1(phrase: string): void {
    console.log(`Hi ${this.name} from greet_1,\n ${phrase}`);
  }
}

// Interface in variable forces it to have a greet method
const p: Greetable = new Person('Navpreet Singh', 30, 'male');
p.greet('I am a developer');
p.greet_1(' I am working on Node JS project');

// *** Extending Interfaces ***
console.log(space, 'Extended Interfaces', space, 'Optional parameters');
interface Named {
  readonly name: string;
  outputName?: string;
}

interface Aged {
  age: number;
}

interface Employee extends Named, Aged {
  greet: (phrase: string) => void;
}

// Interfaces as Function Types
console.log(space, 'Interfaces as Fn Types');
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};
console.log('Addition: ', add(1, 3));

interface SubtractFn {
  (a: number, b: number): number;
}
let subtract: SubtractFn;
subtract = (n1: number, n2: number) => {
  return n1 - n2;
};
console.log('Subtraction: ', subtract(5, 3));
