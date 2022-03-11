const axios = require('axios');
const joystick = require("./rev_joystick.js");
const agents = require("./rev_agent.js");
const host = "http://143.198.151.138:8089/api/simulations";

async function test2 () {
  const map1 = await joystick.loadMap(host, "Test2");
  const startRestart = await joystick.start(host, 1);
  let pointsLeft = 0;
  let agent = new agents.Agent(0,1);
  // let agent2 = new agents.Agent(1,1);

  // while (pointsLeft < 200) {
    try {
      agent.think();
      // agent2.think();
      const endTrn = await joystick.endTurn(1);
      const updateScore = await axios.get(host + "/1/status");
      pointsLeft = updateScore.data.simulationData.Statistics.SimPoints;
      console.log("Points: ", pointsLeft);
    } catch (error) {
      console.log(error);
    }
  // }
}

test2();