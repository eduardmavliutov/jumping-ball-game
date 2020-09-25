const treesXPositions = [{
  attribute: 'cx',
  value: '-40'
},{
  attribute: 'points',
  value: '-20,300 -60,300 -35,250'
},{
  attribute: 'cx',
  value: '-340'
},{
  attribute: 'points',
  value: '-320,280 -360,280 -340,220'
}];

const cloudsXPositions = ['-20%', '-15%', '-23%'];

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

  resetPosition() {
    const trees = Array.from(this.domElements)
                        .slice()
                        .filter((g) => g.getAttribute('id') === 'trees')[0].children;
    Array.from(trees).forEach((svgElement, index) => svgElement.setAttribute(treesXPositions[index].attribute, treesXPositions[index].value));

    const clouds = Array.from(this.domElements)
                        .slice()
                        .filter((g) => g.getAttribute('id') === 'clouds')[0].children;
    Array.from(clouds).forEach((svgElement, index) => svgElement.setAttribute('cx', cloudsXPositions[index]));
  }
}