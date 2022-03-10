const axios = require('axios');
const joystick = require("./rev_joystick.js");
const agent = require("./agent.js");
const host = "http://143.198.151.138:8089/api/simulations";

async function test1 () {
  const map0 = await joystick.loadMap(host, "Test1");
  const startRestart = await joystick.start(host, 0);
  let pointsLeft = 0;

  while (pointsLeft < 200) {
    try {
      const brain = await agent.think(0,0);
      const endTrn = await joystick.endTurn(0);
      const updateScore = await axios.get(host + "/0/status");
      pointsLeft = updateScore.data.simulationData.Statistics.SimPoints;
      console.log("Points: ", pointsLeft);
    } catch (error) {
      console.log(error);
    }
  }
}

test1();
