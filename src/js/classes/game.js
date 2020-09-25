import { generateBaulks, isDotInRange } from './../utils';
import { models } from './../models';
import { Ball } from './ball';
import { Background } from './background';

export class Game {
  constructor() {
    this.svgContainer = document.querySelector('#svg-box');
    this.svgRect = this.svgContainer.getBoundingClientRect();
    this.ball = new Ball(this.svgContainer, this.svgRect);
    this.background = new Background(this.svgContainer);
    this.messageContainer = document.querySelector('#message-container');
    this.playAgainBtn = document.querySelector('#play-again-btn');
    this.startTheGameBtn = document.querySelector('#start-the-game-btn');
    this.baulks = [];
    this.gameOver = false;
    this.currentBaulk = null;
    this.intervalId = null;
    this.round = 1;
    this.init();
  }

  init() {
    this.playAgainBtn.addEventListener('click', this.onPlayAgainBtnClick.bind(this));
    this.startTheGameBtn.addEventListener('click', this.onStartGameBtnClick.bind(this));
  }

  schedule(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    });
  }

  startBaulksAnimation(promise = this.schedule(0), round = this.round) {
    if(this.baulks.length === 0) {
      this.stopGame();
      return;
    }
    if(this.gameOver) {
      return;
    }
    promise.then(() => {
      if(round === this.round) {
        this.currentBaulk = this.baulks.shift();
        this.currentBaulk.animate();
        !this.gameOver && this.showMessage(`Obstacles left: <strong>${this.baulks.length}</strong>`);
        this.startBaulksAnimation(this.schedule(this.currentBaulk.animation.duration));
      }
    });
  }

  startGame() {
    this.baulks = generateBaulks(models, 10, this.svgContainer, this.svgRect);
    this.gameOver = false;
    this.svgContainer.style.transform = 'scale(1)';
    this.ball.domElement.setAttribute('fill', 'purple');
    this.round++;
    this.hide(this.startTheGameBtn, 'left');
    this.background.startAnimation();
    this.startBaulksAnimation();
    this.startTrackingCoordinates();
  }

  stopGame() {
    this.svgContainer.style.transform = 'scale(0.5)';
    this.currentBaulk.domElement.style.display = 'none';
    this.baulks.forEach((baulk) => baulk.domElement.style.display = 'none');
    this.stopTrackingCoordinates();
    const timerId = setTimeout(() => {  
      this.showMessage(this.getGameOverText());
      clearTimeout(timerId);
    }, 400);
    this.background.stopAnimation();
    setTimeout(() => {
      this.show(this.playAgainBtn);
    }, 400);
  }

  showMessage(message) {
    this.messageContainer.innerHTML = message;
  }

  getGameOverText() {
    return this.baulks.length === 0 ? 'Congratulations! You win!' : 'Ooops, you lose :(';
  }

  startTrackingCoordinates() {
    this.intervalId = setInterval(() => {
      const ball = this.ball.getCoordinates();
      const baulk = this.currentBaulk.getCoordinates();
      if(ball.some((dot) => isDotInRange(dot, baulk.x, baulk.y, baulk.width, baulk.height))) {
        this.ball.domElement.setAttribute('fill', 'black');
        this.gameOver = true;
        this.stopGame();
      }
    }, 100);
  }

  stopTrackingCoordinates() {
    clearInterval(this.intervalId);
  }

  onPlayAgainBtnClick() {
    this.startGame();
    this.hide(this.playAgainBtn, 'left');
  }

  onStartGameBtnClick() {
    this.startGame();
    this.show(this.messageContainer);
  }

  hide(element, transformDirection) {
    element.blur();
    element.style.opacity = '0.5';
    if(transformDirection) {
      const transformValue = transformDirection === 'right' ? '40%' : '-40%';
      element.style.transform = `translateX(${transformValue})`;
    }
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.display = 'none';
    }, 400);
  }

  show(element) {
    element.style.display = 'block';
    setTimeout(() => {
      element.style.opacity = '0.5';
      element.style.transform = 'translateX(0%)';
      element.style.opacity = '1';
    }, 400);
  }
}