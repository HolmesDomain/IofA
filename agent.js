const axios = require('axios').default;
const joystick = require("./joystick.js");
// const joystick = require("./rev_joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

// let home;
// let payload;

let target;

const scan = {
  home: "",
  payload: "",
  agents: "",
  setPayload: function(setter) {
    this.payload = setter;
  },
  setHome: function(setter) {
    this.home = setter;
  },
  setAgents: function(setter) {
    this.agents = setter;
  }
};

function think(agent) {
  return new Promise((resolve, reject) => {
    getScan(0).then(function(response) {
      if(scan.payload) {
        return getPayload(agent, scan.payload);
      } else if (scan.payload.length == 0) {
        return goHome(agent, scan.home);
      }
    })
    .then((response) => {
      resolve(response);
    })
    .catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
}

function goHome(agent, targ) {
  return new Promise((resolve, reject) => {
    try {
      if(targ > 0) {
        resolve(joystick.action(2, agent, "turnRight", 0));
      } else if (targ < 0) {
        resolve(joystick.action(2, agent, "turnLeft", 0));
      } else if (targ) {
        resolve(joystick.action(2, agent, "drop", 0));
      } else {
        resolve(joystick.action(2, agent, "moveForward", 0));
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

// function turn(agent, targ) {
//   return new Promise((resolve, reject) => {
//     try {
//       if(targ > 0) {
//         resolve(joystick.action(2, agent, "turnRight", 0));
//       } else if (targ < 0) {
//         resolve(joystick.action(2, agent, "turnLeft", 0));
//       } else if (targ) {
//         resolve(joystick.action(2, agent, "drop", 0));
//       } else {
//         resolve(joystick.action(2, agent, "moveForward", 0));
//       }
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// }

function getPayload(agent, targ) {
  return new Promise((resolve, reject) => {
    try {
      if(targ > 0) {
        resolve(joystick.action(2, agent, "turnRight", 0));
      } else if (targ < 0) {
        resolve(joystick.action(2, agent, "turnLeft", 0));
      } else if (targ) {
        resolve(joystick.action(2, agent, "pickUp", 0));
      } else {
        resolve(joystick.action(2, agent, "moveForward", 0));
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

function getScan(agent) {
  return new Promise((resolve, reject) => {
    axios.get(host + "/2/agents/" + agent +  "/status")
    .then(function (response) {
      console.log("getScan", response.data.agentData.Scan);
      scan.setAgents(response.data.agentData.Scan.Agents);
      scan.setPayload(response.data.agentData.Scan.Payloads);
      scan.setHome(response.data.agentData.Scan.Home);
      resolve(scan.home);
    })
    .catch(function (error) {
      console.log(error);
      reject(error);
    });
  })
}

exports.think = think;
