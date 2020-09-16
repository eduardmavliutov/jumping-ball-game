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

function generateBaulks(model, neededAmount = model.length) {
  const baulks = new Array(neededAmount);
  baulks.forEach((baulk) => baulk = getRandomArrayElement(model));
  return baulks;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
