"use strict";
const userName = 'Realms AI';
console.log(userName);
console.log('test');
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', () => {
        console.log('Clicked');
    });
}
const clickHandler = (message) => {
    console.log('Clicked! ' + message);
};
if (button)
    button.addEventListener('click', clickHandler.bind(null, 'You are welcome!'));
//# sourceMappingURL=index.js.map