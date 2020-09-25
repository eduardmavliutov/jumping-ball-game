import { Baulk } from './classes/baulk';

 export const isDotInRange = (dot, figureX, figureY, figureWidth, figureHeight) => {
  const {x, y} = dot;
  const xRange = {
    from: figureX,
    to: figureX + figureWidth
  };
  const yRange = {
    from: figureY,
    to: figureY + figureHeight
  };
  return x >= xRange.from && x <= xRange.to && y >=yRange.from && y <= yRange.to;
}

export const generateBaulks = (models, neededAmount = model.length, svgContainer, svgRect) => {
  if (neededAmount === models.length) {
    return models.map((model) => new Baulk(model));
  } 
  const baulks = new Array(neededAmount);
  for (let i = 0; i < baulks.length; i++) {
    baulks[i] = new Baulk(getRandomArrayElement(models), svgContainer, svgRect)
  }
  return baulks;
}

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}
