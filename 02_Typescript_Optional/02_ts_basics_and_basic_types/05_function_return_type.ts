export {};

const add = (n1: number, n2: number): number => {
  return +n1 + +n2;
};

// Function Return Types and Void
const printResult = (num: number): void => {
  console.log('Result: ', num);
};

const printResult_1 = (num: number): undefined => {
  console.log('Result: ', num);
  return;
};

printResult(add(5, 6));

let combineValues: Function;
combineValues = add;
console.log('Combine Values: ', combineValues(6, 7));
combineValues = printResult;
// Below log returns "UNDEFINED"
console.log('Combine Values: ', combineValues(6, 7));

let cV: (n1: number, n2: number) => number;
cV = add;
// Below comparison gives error as it doesn't satisfy the exact cV type
// cV = printResult;
console.log('New Combine Values: ', cV(9, 10));

// Function Types and Callbacks
const addHandler = (
  n1: number,
  n2: number,
  cb: (num: number) => void
): void => {
  const result = n1 + n2;
  cb(result);
};

addHandler(10, 20, (result) => {
  console.log('Add Handler Result: ', result);
});
