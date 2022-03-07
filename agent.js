const axios = require('axios').default;
const joystick = require("./joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

let home;
let payload;

async function manhattan (agent, a, b) {
  let x;
  let y;

  if(a == 0) {
    x = "nothing";
  } else if (a > 0) {
    x = "right"
  } else {
    x = "left";
    // await joystick.action(2, 0, "turnLeft", 0);
  }

  if(b == 0) {
    y = "nothing";
  } else if (b > 0) {
    y = "forward";
    await joystick.action(2, 0, "moveForward", 0);
  } else {
    y = "backward";
  }

  console.log(x,y);
}

async function think (agent) {
  axios.get(host + "/2/agents/" + agent +  "/status")
  .then(function (response) {
    payload = response.data.agentData.Scan.Payloads;
    // if (payload[0][0] == 0) {
    //   move(agent);
    // } else if (payload[0][0] > 0 && payload[0][1] > 0) {
    //   turn(agent);
    //   move(agent);
    // }
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(async function () {
    await turn(agent);
  })
}

async function turn (agent) {
  if(payload[0][0] > 0) {
    await joystick.action(2, agent, "turnRight", 0);
  } else if (payload[0][0] < 0) {
    await joystick.action(2, agent, "turnLeft", 0);
  } else if (payload[0][1]) {
    await joystick.action(2, agent, "pickUp", 0);
  } else {
    await move(agent);
  }
}

async function move (agent) {
    await joystick.action(2, agent, "moveForward", 0);
}

axios.get(host + "/2/agents/0/status")
.then(function (response) {
  console.log(response.data.agentData.Scan);
  // console.log(response.data.agentData.Scan.Home);
  // console.log(response.data.agentData.Scan.Payloads);
  // console.log(response.data.agentData.Scan.Walls);
  // console.log(response.data.agentData.Scan.Agents);
  
  home = response.data.agentData.Scan.Home;
  payload = response.data.agentData.Scan.Payloads;

  // manhattan(payload[0][0],payload[0][1]);
})
.catch(function (error) {
  console.log(error);
});

exports.think = think;
