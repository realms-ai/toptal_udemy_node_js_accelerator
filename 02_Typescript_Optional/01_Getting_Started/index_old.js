const button = document.querySelector('button');
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');

function add(num1, num2) {
  // return num1 + num2; //concatenate the number rather than adding them
  if (typeof num1 === 'number' && typeof num2 === 'number') {
    return num1 + num2;
  } else {
    // shortcut for parseFloat
    return +num1 + +num2;
  }
}

button.addEventListener('click', function () {
  console.log(add(input1.value, input2.value));
});
