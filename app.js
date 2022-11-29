const appNode = document.getElementById('app');
const containerNode = document.createElement('div');
const [areaSizeMobile, areaSizeDesktop, breakpoint] = [130, 200, 500];
const viewportWidth = window.visualViewport.width;
const viewportHeight = window.visualViewport.height;
const areaSize = viewportWidth <= breakpoint ? areaSizeMobile : areaSizeDesktop;
const amountOfHorizontalArea = Math.floor(viewportWidth / areaSize);
const amountOfVerticalArea = Math.floor(viewportHeight / areaSize);
const amountGrid = amountOfHorizontalArea * amountOfVerticalArea;
let state = (new Array(amountGrid)).fill(0);

containerNode.className = 'container';
appNode.append(containerNode);

for (let index = 0; index < amountGrid; index++) {
  createCell(containerNode, areaSize);
}

setInterval(() => {
  updateState()
}, 500);

const updateState = () => {
  const isAreaEmpty = state.every(el => el === 1);
  if (!isAreaEmpty) {
    while (true) {
      let randomItem = Math.floor(Math.random() * state.length);
      if (!state[randomItem]) {
        state[randomItem] = 1;
        const cellList = document.querySelectorAll('.cell');
        cellList[randomItem].append(getBall(randomItem));
        break;
      }
    }
  }
}

const getBall = id => {
  const ballNode = document.createElement('div');
  ballNode.className = 'ball';
  const [r, g, b] = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  ballNode.style.background = `rgb(${r} ${g} ${b})`;
  ballNode.onclick = e => {
    state[id] = 0;
    ballNode.remove();
  }
  return ballNode;
}

function createCell(outputNode, areaSize) {
  const cellNode = document.createElement('div');
  cellNode.className = 'cell';
  cellNode.style.width = `${areaSize}px`;
  cellNode.style.height = `${areaSize}px`;
  outputNode.append(cellNode);
}

// update app on resize
let resizeTimer;
onresize = e => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    window.location.reload();
  }, 250);
}