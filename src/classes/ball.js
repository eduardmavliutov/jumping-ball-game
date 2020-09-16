export class Ball {
  constructor(ballSelector, svgContainer) {
    this.domElement = document.querySelector(ballSelector);
    this.svgContainer = svgContainer;
    this.svgRect = this.svgContainer.getBoundingClientRect();
    this.init();
  }

  init() {
    this.svgContainer.addEventListener('click', (event) => {
      const point = event.pageX - this.svgRect.left;
      this.domElement.setAttribute('cx', `${point}px`);
      this.domElement.classList.add('jump');
      setTimeout(() => {
        this.domElement.classList.remove('jump');
      }, 500)
    });
  }
}