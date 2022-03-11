const axios = require('axios');
const joystick = require("./rev_joystick.js");
const agent = require("./agent.js");
const host = "http://143.198.151.138:8089/api/simulations";

async function test2 () {
  const map1 = await joystick.loadMap(host, "Test2");
  const startRestart = await joystick.start(host, 1);
  let pointsLeft = 0;

  while (pointsLeft < 200) {
    try {
      const brain = await agent.think(0,1);
      const brain2 = await agent.think(1,1);
      const endTrn = await joystick.endTurn(1);
      const updateScore = await axios.get(host + "/1/status");
      pointsLeft = updateScore.data.simulationData.Statistics.SimPoints;
      console.log("Points: ", pointsLeft);
    } catch (error) {
      console.log(error);
    }
  }
}

test2();