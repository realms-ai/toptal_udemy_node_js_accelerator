// Union Type
const combine = (i1: string | number, i2: string | number): string | number => {
  let result;
  if (typeof i1 === 'number' && typeof i2 === 'number') result = i1 + i2;
  else result = i1.toString() + i2.toString();
  return result;
};

// Returning number
console.log(combine(5, 6));

// Returning String
console.log(combine('Navpreet', 'Singh'));
