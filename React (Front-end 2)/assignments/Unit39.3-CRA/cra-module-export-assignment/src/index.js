import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import choice from './helpers'
import fruits from './foods';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Unit 39.3 assignment ES2015 Module Assignment
// This file should import the fruits and both array helpers. It should then:

// Randomly draw a fruit from the array
// Log the message “I’d like one RANDOMFRUIT, please.”
// Log the message “Here you go: RANDOMFRUIT”
// Log the message “Delicious! May I have another?”
// Remove the fruit from the array of fruits
// Log the message “I’m sorry, we’re all out. We have FRUITSLEFT left.”

const fruit = choice(fruits);

console.log(`I'd like one ${fruit} please.`);
console.log(`Here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);
const indexOfFruit = fruits.indexOf(fruit);
const fruitsLeft = [...fruits.slice(0, indexOfFruit), ...fruits.slice(indexOfFruit + 1)];
console.log(`I'm sorry, we're all out. We have ${fruitsLeft} left.`);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
