const joystick = require("./joystick.js");

async function test1 () {
  await joystick.action(0, 0, "pickUp", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "moveForward", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "drop", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "moveForward", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "pickUp", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "moveForward", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "turnRight", 0);
  await joystick.endTurn(0);
  await joystick.action(0, 0, "drop", 0);
  await joystick.endTurn(0);
}

test1();
