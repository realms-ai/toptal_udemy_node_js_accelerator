const space = '\n';

// Built in Generics
const names: Array<string> = []; // string[]
// names?[0]?.split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve('Hi There');
    } catch (err) {
      // console.log('Err: ', err);
      reject(err);
    }
  }, 2000);
});

const promise1: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw new Error('Intentional Error');
      resolve('Hi There');
    } catch (err) {
      // console.log('Err: ', err);
      reject(err);
    }
  }, 2000);
});

promise
  .then((data) => {
    console.log('Return Promise providing functions: ', data.split(' '));
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

promise1
  .then((data) => {
    console.log('Return Promise providing functions: ', data.split(' '));
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

// CREATING A GENERIC FUNCTION
console.log(space, 'CREATING A GENERIC FUNCTION');

const merge = (objA: object, objB: object): object => {
  return Object.assign(objA, objB);
};

const mergeObj = merge({ name: 'Navpreet' }, { age: 30 });
console.log('Name: ', mergeObj.name);
console.log('Age: ', mergeObj.age);
// In above function , mergeObj cannot access name or age
// Extending generic types to make sure user sends right parameters type to the function
function merge_1<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const merge2 = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// const mergeObj1 = merge_1({ name: 'Navpreet' }, { age: 30 });
const mergeObj1 = merge2({ name: 'Navpreet' }, { age: 30 });
console.log('Name: ', mergeObj1.name);
console.log('Age: ', mergeObj1.age);

const mergeObj2 = merge_1(
  { hobbies: ['Sports', 'Boxing', 'Running'] },
  { name: 'Navpreet Singh', age: 30, gender: 'Male' }
);
console.log('Generic Type Obj2: ', mergeObj2);

const mergeObj3 = merge_1({ name: 'Navpreet' }, 30);

// interface to tell all properties which have a length property
interface Lengthy {
  length: number;
}

const countDesc = <T extends Lengthy>(ele: T): [T, string] => {
  let desc = 'Got no value.';
  if (ele.length > 0) {
    desc = `Got ${ele.length} elements`;
  }
  return [ele, desc];
};

console.log(countDesc('Hi There'));
console.log(countDesc(['Hi', 'There']));

// "keyof" Constraint
console.log(space, 'KEYOF CONSTRAINT');

const extractConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => {
  return `value ${obj[key]}`;
};

console.log(extractConvert({ name: 'Navpreet Singh', age: 30 }, 'name'));

// GENERIC CLASSES
console.log(space, 'GENERIC CLASSES');

class DStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  // extended generic type with string, number, boolean
  // Reason: below functionality don't work with Arrays and Objects
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DStorage<string>();
textStorage.addItem('Item 1');
textStorage.addItem('Item 2');
textStorage.addItem('Item 3');
textStorage.removeItem('Item 2');
console.log('String Array: ', textStorage.getItems());

const numberStorage = new DStorage<number>();
numberStorage.addItem(4);
numberStorage.addItem(6);
numberStorage.addItem(8);
numberStorage.removeItem(6);
console.log('Number Array: ', numberStorage.getItems());

// GENERIC UTILITY TYPES
console.log(space, 'GENERIC UTILITY TYPES');

// PARTIAL type
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createCourseGoal = (courseGoal: Partial<CourseGoal>) => {
  return courseGoal;
};

const cg1 = createCourseGoal({ title: 'Title 1', description: 'Title 1 desc' });
const cg2 = createCourseGoal({
  title: 'Title 2',
  completeUntil: new Date('15 - 02 - 2023'),
});
const cg3 = createCourseGoal({
  description: 'Title 3 desc',
});

console.log(
  `CG 1: ${JSON.stringify(cg1)}\n CG2: ${JSON.stringify(
    cg2
  )}\n CG 3: ${JSON.stringify(cg3)}`
);

// READONLY type
const array: Readonly<string[]> = ['Ele 1', 'Ele 2'];
// readonly array would give error while modifing the array but allow it in the end
array.push('Ele 3');
console.log('Readonly Array: ', array);
