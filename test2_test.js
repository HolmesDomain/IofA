const joystick = require("./joystick.js");

async function test2 () {
  await joystick.action(1, 0, "pickUp", 0);
  await joystick.action(1, 1, "moveForward", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "drop", 0);
  await joystick.action(1, 1, "turnRight", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "turnRight", 0);
  await joystick.action(1, 1, "moveForward", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "moveForward", 0);
  await joystick.action(1, 1, "pickUp", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "turnLeft", 0);
  await joystick.action(1, 1, "turnRight", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "moveForward", 0);
  await joystick.action(1, 1, "drop", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "pickUp", 0);
  await joystick.action(1, 1, "turnLeft", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "turnLeft", 0);
  await joystick.action(1, 1, "idle", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "drop", 0);
  await joystick.action(1, 1, "pickUp", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "idle", 0);
  await joystick.action(1, 1, "turnRight", 0);
  await joystick.endTurn(1);
  await joystick.action(1, 0, "idle", 0);
  await joystick.action(1, 1, "drop", 0);
  await joystick.endTurn(1);
}

test2();