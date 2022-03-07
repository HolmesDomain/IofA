const joystick = require("./joystick.js");

async function hw1 () {
  await joystick.action(2, 0, "turnLeft", 0);
  await joystick.endTurn(2);
  await joystick.action(2, 0, "turnLeft", 0);
  await joystick.endTurn(2);
  await joystick.action(2, 0, "moveForward", 0);
  await joystick.endTurn(2);
  await joystick.action(2, 0, "drop", 0);
  await joystick.endTurn(2);
}

hw1();