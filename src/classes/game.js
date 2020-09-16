import { isDotInRange } from '../utils';

export class Game {
  constructor(ball, baulks) {
    this.ball = ball;
    this.baulks = baulks;
    this.baulkCounter = document.querySelector('#baulk-counter');
    this.gameOver = false;
    this.currentBaulk = null;
    this.intervalId = null;
  }

  schedule(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time)
    });
  }

  startAnimation(promise = this.schedule(0)) {
    if(this.baulks.length === 0 || this.gameOver) {
      return;
    }
    promise.then(() => {
      this.currentBaulk = this.baulks.shift();
      this.currentBaulk.animate();
      this.baulkCounter.innerHTML = `Obstacles left: <strong>${this.baulks.length}</strong>`;
      this.startAnimation(this.schedule(this.currentBaulk.animation.duration));
    })
  }

  start() {
    this.startAnimation();
    this.showCoordinates();
  }

  stop() {
    this.ball.svgContainer.style.opacity = '0';
    this.baulkCounter.style.opacity = '0';
    const timerId = setTimeout(() => {
      this.ball.svgContainer.style.display = 'none';
      this.baulkCounter.style.display = 'none;'
      clearTimeout(timerId);
    }, 400)
    clearInterval(this.intervalId);
  }

  showMessage(message) {

  }

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
    }
  }

  showCoordinates() {
    this.intervalId = setInterval(() => {
      const ball = this.getBallCoordinates();
      const baulk = this.getCurrentBaulkCoordinates();
      if(ball.some((dot) => isDotInRange(dot, baulk.x, baulk.y, baulk.width, baulk.height))) {
        this.ball.domElement.setAttribute('fill', 'black');
        this.gameOver = true;
        this.stop();
      }
    }, 100)
  }
}