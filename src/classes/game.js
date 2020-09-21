import { generateBaulks, isDotInRange } from '../utils';
import { models } from '../models';

export class Game {
  constructor(ball, baulks) {
    this.ball = ball;
    this.baulks = baulks;
    this.messageContainer = document.querySelector('#message-container');
    this.playAgainBtn = document.querySelector('#play-again-btn');
    this.playAgainBtn.addEventListener('click', this.onPlayAgainBtnClick.bind(this));
    this.backgroundElements = this.ball.svgContainer.querySelectorAll('g')
    this.gameOver = false;
    this.currentBaulk = null;
    this.intervalId = null;

  }

  schedule(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    });
  }

  startBaulksAnimation(promise = this.schedule(0)) {
    if(this.baulks.length === 0) {
      this.stop();
      return;
    }
    if(this.gameOver) {
      return;
    }
    promise.then(() => {
      this.currentBaulk = this.baulks.shift();
      this.currentBaulk.animate();
      !this.gameOver && this.showMessage(`Obstacles left: <strong>${this.baulks.length}</strong>`);
      this.startBaulksAnimation(this.schedule(this.currentBaulk.animation.duration));
    });
  }
  // СОЗДАТЬ ОТДЕЛЬНЫЙ КЛАСС ДЛЯ BACKGROUND 
  // и вынести методы для управления анимацией этих фигур в этот класс
  startBackgroundAnimation() {
    this.ball.svgContainer.querySelectorAll('g').forEach((g) => {
      g.style.animationPlayState = 'running';
    });
  }

  stopBackgroundAnimation() {
    this.ball.svgContainer.querySelectorAll('g').forEach((g) => {
      g.style.animationPlayState = 'paused';
    });
  }

  start() {
    this.startBackgroundAnimation();
    this.startBaulksAnimation();
    this.startTrackingCoordinates();
  }

  stop() {
    this.ball.svgContainer.style.transform = 'scale(0.5)';
    this.currentBaulk.domElement.style.display = 'none';
    this.baulks.forEach((baulk) => baulk.domElement.style.display = 'none');

    const timerId = setTimeout(() => {  
      this.showMessage(this.getGameOverText());
      clearTimeout(timerId);
    }, 400);
    
    this.stopBackgroundAnimation();
    setTimeout(() => {
      this.showPlayAgainBtn();
    }, 400);
    
  }

  showMessage(message) {
    this.messageContainer.innerHTML = message;
  }

  getGameOverText() {
    return this.baulks.length === 0 ? 'Congratulations! You win!' : 'Ooops, you lose :(';
  }

  // ПЕРЕНЕСТИ В КЛАСС BALL
  getBallCoordinates() {
    const ballRect = this.ball.domElement.getBoundingClientRect();
    const { x, y, width, height } = ballRect;
    const { left: svgRectLeft, top: svgRectTop } = this.ball.svgRect;
    const radius = width / 2;
    const xBallCenter = x - svgRectLeft + (width / 2);
    const yBallCenter = y - svgRectTop + (height / 2);
    const angles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    return angles.map((angle) => {
      const x = (Math.cos(angle) * radius + xBallCenter).toFixed(2);
      const y = (Math.sin(angle) * radius + yBallCenter).toFixed(2);
      return {
        x, y
      };
    });
  }

  getCurrentBaulkCoordinates() {
    const baulkRect = this.currentBaulk.domElement.getBoundingClientRect();
    const { left: svgRectLeft, top: svgRectTop } = this.ball.svgRect;
    return {
      x: baulkRect.x - svgRectLeft,
      y: baulkRect.y - svgRectTop, 
      width: baulkRect.width, 
      height: baulkRect.height
    };
  }

  startTrackingCoordinates() {
    this.intervalId = setInterval(() => {
      const ball = this.getBallCoordinates();
      const baulk = this.getCurrentBaulkCoordinates();
      if(ball.some((dot) => isDotInRange(dot, baulk.x, baulk.y, baulk.width, baulk.height))) {
        this.ball.domElement.setAttribute('fill', 'black');
        this.gameOver = true;
        this.stop();
      }
    }, 100);
  }

  stopTrackingCoordinates() {
    clearInterval(this.intervalId);
  }

  showPlayAgainBtn() {
    this.playAgainBtn.style.display = 'block';
    setTimeout(() => {
      this.playAgainBtn.style.opacity = '1';
    }, 200)
  }

  hidePlayAgainBtn() {
    this.playAgainBtn.style.opacity = '0';
    setTimeout(() => {
      this.playAgainBtn.style.display = 'none';
    }, 200)
  }

  onPlayAgainBtnClick() {
    this.baulks = generateBaulks(models, 10);
    this.gameOver = false;
    this.ball.svgContainer.style.transform = 'scale(1)';
    this.ball.domElement.setAttribute('fill', 'purple');
    this.start();
  }
}