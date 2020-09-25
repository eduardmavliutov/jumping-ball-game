export class Background {
  constructor(svgContainer) {

    this.svgContainer = svgContainer;
    this.domElements = this.svgContainer.querySelectorAll('g');
  }

  startAnimation() {
    this.domElements.forEach((g) => {
      g.style.animationPlayState = 'running';
    });
  }

  stopAnimation() {
    this.domElements.forEach((g) => {
      g.style.animationPlayState = 'paused';
    });
  }
}