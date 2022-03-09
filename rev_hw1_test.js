const axios = require('axios').default;
const joystick = require("./rev_joystick.js");
const agent = require("./agent.js");

const host = "http://143.198.151.138:8089/api/simulations";
let pointsLeft = 50;

function play () {
  // let pointsLeft = 50;

  // while (pointsLeft < 100) {
    //agent 0 do 1 think




    for(let x = 0; x<3; x++) {
      agent.think(0)
      .then((response) => {
        return joystick.endTurn(2);
      }).then((response) => {
        console.log('Response', response);
        return axios.get(host + "/2/status");
      })
      .then((response) => {
        console.log(response.data);
        // pointsLeft += 50;
      })
      .catch (err => {
        console.log(err);
      });
    }

    // agent 1 do think
    //end turn
    // await joystick.endTurn(2);

    // axios.get(host + "/2/status")
    // .then(function (response) {
    //   // console.log(response.data);
    //   pointsLeft = response.data.simulationData.Statistics.SimPoints;
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  // }
}

play();