const space = '\n';
// Intersection Types
console.log('Intersection Types');

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// Below type will have both the properties of ADMIN and EMPLOYEE
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Navpreet Singh',
  privileges: ['create-server'],
  startDate: new Date(),
};

// Above types can also be achieved by Interface extends
interface Admin_1 {
  name: string;
  privileges: string[];
}

interface Employee_1 {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee_1 extends Admin_1, Employee_1 {}

const e2: ElevatedEmployee_1 = {
  name: 'Navpreet Singh',
  privileges: ['create-server'],
  startDate: new Date(),
};

// Why we use types. Types are more useful in conjuntion types
type Combinable = string | number;
type Numeric = number | boolean;

// Interesection of both types i.e. NUMBER
type Universal = Combinable & Numeric;

type Combined = Combinable | Numeric;

// More on Type Guards
console.log(space, 'Type Guards');

const add = (a: Combinable, b: Combinable) => {
  // Below is a TYPE GUARD
  if (typeof a === 'string' || typeof b === 'string')
    return a.toString() + b.toString();

  return a + b;
};

type UnknownEmployee = Admin | Employee;

const printEmpInfo = (emp: UnknownEmployee) => {
  console.log('Name: ', emp.name);
  // TYPE GUARD
  if ('privileges' in emp) console.log('Privileges: ', emp.privileges);
  if ('startDate' in emp) console.log('Start Date: ', emp.startDate);
};

printEmpInfo(e1);
console.log(space, 'Print Emp Info without privileges');
printEmpInfo({ name: 'Navpreet Singh', startDate: new Date('10-12-2020') });

// InstanceOf Type Guard in Classes
console.log(space, 'InstanceOf Type Guard in Classes');
class Car {
  drive() {
    console.log('Driving....');
  }
}

class Truck {
  drive() {
    console.log('Driving...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...', amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  if ('loadCargo' in vehicle) vehicle.loadCargo(1000);
  if (vehicle instanceof Truck) vehicle.loadCargo(2000);
};

console.log('Car');
useVehicle(v1);

console.log('Truck');
useVehicle(v2);

// Discriminated Unions
console.log(space, 'Discriminated Unions');

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving with speed: ', speed);
};

console.log('Bird');
moveAnimal({ type: 'bird', flyingSpeed: 1000 });
console.log('Horse');
moveAnimal({ type: 'horse', runningSpeed: 2000 });

// Type Casting
console.log(space, 'Type Casting');

// Type is defined as HtmlParagraphElement
const paragraph = document.querySelector('p');

// Cannot define what is the Html Element
// So have to define what is the HTML Element
const para = document.getElementById('message-output') as HTMLParagraphElement;
para.textContent = 'Hi There from TS';

// ! states that the value will be null
const inp = document.getElementById('user-input') as HTMLInputElement;
const inp_1 = <HTMLInputElement>document.getElementById('user-input');
const inp_2 = document.getElementById('user-input');
inp.value = 'Value from TS';
// Alternative to using !
(inp_2 as HTMLInputElement).value = 'Alternative to use !';

// INDEX PROPERTIES
// a feature that allows us to create objects whcih are more flexible regarding the properties they hold
console.log(space, 'INDEX PROPERTIES');

interface ErrorContainer {
  // {
  //   email: 'Not a valid email',
  //   username: 'Must start with a character'
  // }
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a character',
};

// FUNCTION OVERLOADS
console.log(space, 'FUNCTION OVERLOADS');

function add_1(a: number, b: number): number;
function add_1(a: string, b: string): string;
function add_1(a: string, b: number): string;
function add_1(a: number, b: string): string;
function add_1(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string')
    return `${a.toString()} ${b.toString()}`;
  return a + b;
}

let result: string | string[] | number = add_1('Navpreet', 'Singh');
result = result.split(' ');

let result1: string | string[] | number = add_1(5, 'Singh');
result1 = result1.split(' ');

let result2: string | string[] | number = add_1(5, 6);
// safe operator doesn't work
// have to implement if condition here
if (typeof result2 === 'string') result2 = result2?.split(' ');
console.log('Results: ', result, result1, result2);

// OPTIONAL CHAINING
console.log(space, 'OPTIONAL CHAINING');

const userData = {
  id: 'u1',
  name: 'Navpreet',
  job: {
    title: 'CEO',
    description: 'My own company',
  },
};

console.log('Job info(not available): ', userData?.job?.info);

console.log('Job Desc: ', userData?.job?.description);

// NULLISH COALESCING (null or undefined)
// Avoid (null or undefined or '')
console.log(space, 'NULLISH COALESCING (??)');

const userInput = null;
const userInput1 = undefined;
const userInput2 = '';

const storedData = userInput || 'DEFAULT';
const storedData1 = userInput1 || 'DEFAULT';
const storedData2 = userInput2 || 'DEFAULT';

const storedData_1 = userInput ?? 'DEFAULT';
const storedData_11 = userInput1 ?? 'DEFAULT';
const storedData_12 = userInput2 ?? 'DEFAULT';

console.log(
  `Results with nullish coalescing: ${storedData_1} ${storedData_11} ${storedData_12}`
);
