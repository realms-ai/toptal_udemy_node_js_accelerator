// *** Core types knowledge
function add_1(
  n1: number,
  n2: number,
  showResult: boolean,
  phrase: string
): number | void {
  const result = n1 + n2;
  if (showResult) console.log(phrase + result);
  else return result;
}

const number1: number = 5;
const number2: number = 2.8;
const printResult: boolean = true;
const resultPhrase: string = 'Result is: ';

add_1(number1, number2, printResult, resultPhrase);

const person: {
  name: string;
  age: number;
  nickname(n?: string): string;
  hobbies: string[];
  role: [number, string]; // tuple
} = {
  name: 'Navpreet Singh',
  age: 32,
  nickname: (n?) => {
    return n || person.name;
  },
  hobbies: ['gyming', 'swimming', 'cooking'],
  role: [10, 'author'],
};

console.log('Default Nickname: ', person.nickname());
console.log('Nickname: ', person.nickname('Amarjit Singh'));

for (const hobby of person.hobbies) {
  console.log('Hobby: ', hobby.toUpperCase());
}

person.role.push('admin');
// Below code gives error due to tuple
// person.role[1] = 10
console.log('Person Role: ', person.role);

const product: {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
} = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!',
  },
};

console.log('Product: ', product);

const [ADMIN, READ_ONLY, AUTHOR] = [0, 1, 2];
// OR works with enum
enum Role {
  ADMIN = 5,
  READ_ONLY = 'RO',
  AUTHOR = 6,
}
