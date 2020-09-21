import { SvgFigure } from './svgfigure';

export class Ball extends SvgFigure {
  constructor(ballSelector) {
    super();
    this.domElement = document.querySelector(ballSelector);
    this.svgRect = this.svgContainer.getBoundingClientRect();
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
  
}