const userName = 'Realms AI';
console.log(userName);

console.log('test');

// Below error can be solved by setting strictNullChecks to false
const button: HTMLButtonElement = document.querySelector(
  'button'
) as HTMLButtonElement;

if (button) {
  button.addEventListener('click', () => {
    console.log('Clicked');
  });
}

// strictBindApply: false solves the below error

const clickHandler = (message: string) => {
  console.log('Clicked! ' + message);
};

// if (button) button.addEventListener('click', clickHandler.bind(null));
if (button)
  button.addEventListener('click', clickHandler.bind(null, 'You are welcome!'));
