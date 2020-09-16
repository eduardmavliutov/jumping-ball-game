import { SvgFigure } from './svgfigure';

export class Baulk extends SvgFigure {
  constructor(animation) {
    super();
    this.animation = animation;
    this.id = Math.random().toFixed(3) * 1000 + 'baulk';
    this.domElement = this.createElement();
  }

  createElement() {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute('id', this.id);
    element.setAttribute('width', '15%');
    element.setAttribute('height', '15%');
    element.setAttribute('x', '-15%');
    element.setAttribute('y', '75%');
    element.setAttribute('fill', 'brown');
    element.classList.add('baulk');
    return element;
  }

  animate() {
    this.svgContainer.insertAdjacentElement('beforeend', this.domElement);
    const baulkElement = this.svgContainer.getElementById(`${this.id}`);
    baulkElement.classList.add(this.animation.name);
    setTimeout(() => {
      baulkElement.classList.remove(this.animation.name);
      this.svgContainer.removeChild(baulkElement);
    }, this.animation.duration);
  }
}