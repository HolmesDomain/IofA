const axios = require('axios').default;
const joystick = require("./joystick.js");
const agent = require("./agent.js");
const host = "http://143.198.151.138:8089/api/simulations";

let pointsLeft;

async function play () {
  do {
    //agent 0 do 1 think
    await agent.think(0).then(async function () {
      await joystick.endTurn(2);
    })
    // agent 1 do think
    //end turn
    // await joystick.endTurn(2);

    axios.get(host + "/2/status")
    .then(function (response) {
      // console.log(response.data);
      pointsLeft = response.data.simulationData.Statistics.SimPoints;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  while (pointsLeft < 100);
}

// function hw1 () { 
//   await play();
// }

// hw1();

play();