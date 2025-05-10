// Global variables
var canvasClass = "canvas";
var snakeClass = "snake";
var snakeDirection = "right";
var movementValue = 30;
var moveSpeed = 800;

// Positional Variables
var childLeft, parentWidth, childWidth;
var childTop, parentHeight, childHeight;

var moveint = null;

function buttonMove_onclick() {
  if (moveint) clearInterval(moveint);
  moveint = setInterval(move, moveSpeed);
}

function move() {
  var canvasElem = document.querySelector(`.${canvasClass}`);
  var snakeElem = document.querySelector(`.${snakeClass}`);

  // Get positions and sizes
  childLeft = parseInt(snakeElem.style.left) || 0;
  childTop = parseInt(snakeElem.style.top) || 0;
  parentWidth = canvasElem.clientWidth;
  parentHeight = canvasElem.clientHeight;
  childWidth = snakeElem.offsetWidth;
  childHeight = snakeElem.offsetHeight;

  // Movement logic
  switch (snakeDirection) {
    case "right":
      if (childLeft + movementValue <= parentWidth - childWidth) {
        snakeElem.style.left = childLeft + movementValue + "px";
      } else {
        stop("Hit right wall");
      }
      break;
    case "left":
      if (childLeft - movementValue >= 0) {
        snakeElem.style.left = childLeft - movementValue + "px";
      } else {
        stop("Hit left wall");
      }
      break;
    case "down":
      if (childTop + movementValue <= parentHeight - childHeight) {
        snakeElem.style.top = childTop + movementValue + "px";
      } else {
        stop("Hit bottom wall");
      }
      break;
    case "up":
      if (childTop - movementValue >= 0) {
        snakeElem.style.top = childTop - movementValue + "px";
      } else {
        stop("Hit top wall");
      }
      break;
  }
}

function stop(msg) {
  clearInterval(moveint);
  alert("Game Over: " + msg);
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      snakeDirection = "left";
      break;
    case 38:
      snakeDirection = "up";
      break;
    case 39:
      snakeDirection = "right";
      break;
    case 40:
      snakeDirection = "down";
      break;
  }
};
