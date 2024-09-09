var car = document.getElementById("car"),
  mapContainer = document.getElementById("map-container"),
  compass = document.getElementById("compass"),
  moveLeft = document.getElementById("left"),
  moveRight = document.getElementById("right"),
  moveUp = document.getElementById("up"),
  moveDown = document.getElementById("down"),
  reqID,
  direction,
  rotation = 0, // Initialize the rotation angle
  carX = 50, // Initialize car position (percentage within the container)
  carY = 50;

function changeDirection(arrow) {
  direction = arrow;
}

function startMoving() {
  var radius = 50 - (car.offsetWidth / mapContainer.offsetWidth) * 50;

  if (direction === "up") {
    carX += 2 * Math.sin(rotation * (Math.PI / 180));
    carY -= 2 * Math.cos(rotation * (Math.PI / 180));
  } else if (direction === "down") {
    carX -= 2 * Math.sin(rotation * (Math.PI / 180));
    carY += 2 * Math.cos(rotation * (Math.PI / 180));
  }

  var distanceFromCenter = Math.sqrt(
    Math.pow(carX - 50, 2) + Math.pow(carY - 50, 2)
  );
  if (distanceFromCenter > radius) {
    carX -= 2 * Math.sin(rotation * (Math.PI / 180));
    carY += 2 * Math.cos(rotation * (Math.PI / 180));
  }

  car.style.left = carX + "%";
  car.style.top = carY + "%";

  // Rotate the map and the compass in the opposite direction of the car's rotation
  mapContainer.style.transform = `rotate(${-rotation}deg)`;
  compass.style.transform = `rotate(${-rotation}deg)`;

  reqID = window.requestAnimationFrame(startMoving);
}

function stopMoving() {
  window.cancelAnimationFrame(reqID);
}

function rotateCar() {
  car.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  mapContainer.style.transform = `rotate(${-rotation}deg)`;
  compass.style.transform = `rotate(${-rotation}deg)`;
}

moveUp.addEventListener("mousedown", function () {
  changeDirection("up");
  startMoving();
});
moveUp.addEventListener("mouseup", stopMoving);

moveDown.addEventListener("mousedown", function () {
  changeDirection("down");
  startMoving();
});
moveDown.addEventListener("mouseup", stopMoving);

moveLeft.addEventListener("mousedown", function () {
  rotation -= 15;
  rotateCar();
});

moveRight.addEventListener("mousedown", function () {
  rotation += 15;
  rotateCar();
});
