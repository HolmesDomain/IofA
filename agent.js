const axios = require('axios');
const joystick = require("./rev_joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

let targets = {};

let turnBack = ["turnRight", "turnRight", "moveForward"];
let turnBack2 = ["turnRight", "turnRight", "moveForward"];

const scan = {
  home: "",
  payload: "",
  agents: "",
  payloaded: "",
  setPayloaded: function(setter) {
    this.payloaded = setter;
  },
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

function think(agent, instance) {
  return new Promise((resolve, reject) => {
    getScan(agent, instance).then(function(response) {
      if (scan.payloaded >= 0) {
        console.log("I do have a payload")
        if (scan.home.length == 0) {
          return joystick.action(instance, agent, "idle", 0);
        } else {
          return goHome(agent, scan.home, instance)
          .then((response) => {
            queue.shift();
          });
        }
      } else {
        if(scan.payload.length != 0) {
          console.log("I don't have a payload")
          if(scan.payload.length > 1) {
            console.log(">1 payload")
            return getPayload(agent, scan.payload, instance);
          } else {
            console.log("I have less than 1 payload");
            console.log(scan.payload);
            return getPayload(agent, scan.payload, instance)
            .then((response) => {
              queue2.shift();
            });
          }
        } else {
          return goHome(agent, scan.home, instance);
        }
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

function goHome(agent, targ, instance) {
  return new Promise((resolve, reject) => {
    try {
      if (Math.abs(targ[0][0]) == Math.abs(targ[0][1])) {
        console.log(queue, "ADJACENT home");
        console.log(queue[0]);
        resolve(joystick.action(instance, agent, queue[0], 0));
      } else {
        if(targ[0][0] > 0) {
          resolve(joystick.action(instance, agent, "turnRight", 0));
        } else if (targ[0][0] < 0) {
          resolve(joystick.action(instance, agent, "turnLeft", 0));
        } else if (targ[0][0] == 0 && targ[0][1] == 1) {
          resolve(joystick.action(instance, agent, "drop", 0));
        } else if (targ[0][0] == 0 && targ[0][1] > 0) {
          resolve(joystick.action(instance, agent, "moveForward", 0));
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

function getPayload(agent, targ, instance) {
  return new Promise((resolve, reject) => {
    try {
      console.log("payload if")
      if (Math.abs(targ[0][0]) == Math.abs(targ[0][1])) {
        console.log(queue2, "ADJACENT payload");
        console.log(queue2[0]);
        resolve(joystick.action(instance, agent, queue2[0], 0));
      } else {
        console.log("payload else")
        if(targ[0][0] > 0) {
          resolve(joystick.action(instance, agent, "turnRight", 0));
        } else if (targ[0][0] < 0) {
          resolve(joystick.action(instance, agent, "turnLeft", 0));
        } else if (targ[0][0] == 0 && targ[0][1] == 1) {
          resolve(joystick.action(instance, agent, "pickUp", 0));
        } else if (targ[0][0] == 0 && targ[0][1] > 0) {
          resolve(joystick.action(instance, agent, "moveForward", 0));
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

function getScan(agent, instance) {
  return new Promise((resolve, reject) => {
    axios.get(host + "/" + instance + "/agents/" + agent +  "/status")
    .then(function (response) {
      scan.setPayloaded(response.data.agentData.Status.Payload);
      scan.setAgents(response.data.agentData.Scan.Agents);
      scan.setPayload(response.data.agentData.Scan.Payloads);
      scan.setHome(response.data.agentData.Scan.Home);
      // console.log(scan.payload[1]);
      // console.log(Math.abs(scan.payload[1]));
      resolve(scan.home);
    })
    .catch(function (error) {
      console.log(error);
      reject(error);
    });
  })
}

function nearestLoc(locList) {
  console.log("rearest");
  let close = 0;
  for(let i = 0; i < locList.length; i++) {
    loc = locList[i].toString();
    if (loc == "0,1") {
      return locList[i];
      // break;
    }
    if(loc == "-1,0" || loc == "1,0" || loc == "0,-1") {
      close++;
    }
  }

  if (close >= 2) {
    let target = Math.floor(Math.random() * locList.length);
    return locList[target];
  } else {
    return;
  }
}

exports.think = think;
