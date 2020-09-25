export class Ball {
  constructor(svgContainer, svgRect) {
    this.svgContainer = svgContainer;
    this.svgRect = svgRect;
    this.domElement = document.querySelector('.ball');
    this.init();
  }

  onSvgContainerClick(event) {
    const point = event.pageX - this.svgRect.left;
    this.domElement.setAttribute('cx', `${point}px`);
    this.domElement.classList.add('jump');
    setTimeout(() => {
      this.domElement.classList.remove('jump');
    }, 500)
  }

  init() {
    this.svgContainer.addEventListener('click', this.onSvgContainerClick.bind(this));
  }

  getCoordinates() {
    const ballRect = this.domElement.getBoundingClientRect();
    const { x, y, width, height } = ballRect;
    const { left: svgRectLeft, top: svgRectTop } = this.svgRect;
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
  
}