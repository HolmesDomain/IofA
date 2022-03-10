const axios = require('axios');
const joystick = require("./rev_joystick.js");
const agent = require("./agent.js");
const host = "http://143.198.151.138:8089/api/simulations";

async function play () {
  const map2 = await joystick.loadMap(host, "HW1");
  const startRestart = await joystick.start(host, 2);
  let pointsLeft = 0;
  
  while (pointsLeft < 100) {
      try {
        const brain = await agent.think(0,2);
        const endTrn = await joystick.endTurn(2);
        const updateScore = await axios.get(host + "/2/status");
        pointsLeft = updateScore.data.simulationData.Statistics.SimPoints;
        console.log("Points: ", pointsLeft);
      } catch (error) {
        console.log(error);
      }
  }
}

play();