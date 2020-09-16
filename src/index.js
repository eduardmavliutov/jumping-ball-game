import './styles/main.css';
import {Baulk} from './classes/baulk.js';
import { Ball } from './classes/ball';
import { Game } from './classes/game';

const svgContainer = document.querySelector('#svg-box');
const ball = new Ball('.ball', svgContainer);
const baulks = [
  new Baulk(svgContainer, {
    name: 'straight',
    duration: 3000
  }),
  new Baulk(svgContainer, {
    name: 'chaos',
    duration: 5000
  }),
  new Baulk(svgContainer, {
    name: 'pendulum',
    duration: 5000
  }),
  new Baulk(svgContainer, {
    name: 'zigzag',
    duration: 5000
  }),
  new Baulk(svgContainer, {
    name: 'ghost',
    duration: 6000
  }),
];

const game = new Game(ball ,baulks);
game.start();




// const schedule = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, time)
//   });
// }

// const run = (array, promise = schedule(0), counter = 1) => {
//   if(array.length === 0) {
//     return;
//   }
//   promise.then(() => {
//     const currentBaulk = array.shift();
//     currentBaulk.animate();
//     baulkCounter.textContent = `Бревно №${counter}`;
//     run(array, schedule(currentBaulk.animation.duration), ++counter);
//   })
// }

// run(baulks);


