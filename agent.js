const axios = require('axios');
const joystick = require("./rev_joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

let targets = {};

let queue = ["turnRight", "turnRight", "moveForward","turnRight", "turnRight", "moveForward"];

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
        if (scan.home.length == 0) {
          // console.log("Oh no");
          //Set a target path
          // const right = joystick.action(instance, agent, "turnRight", 0);
          // stack.push("turnRight");
          // console.log(stack[0]);
          return joystick.action(instance, agent, "idle", 0);
        } else {
            goHome(agent, scan.home, instance);
            return queue.shift();
        }
      } else {
        if(scan.payload.length != 0) {
          if(scan.payload.length > 1) {
            let target = [nearestLoc(scan.payload)];
            console.log(target, "more");
            getPayload(agent, target, instance);
            return queue.shift();
          } else {
              console.log("else");
              return getPayload(agent, scan.payload, instance);
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
        // if(queue.length == 0) {
        //   queue.push("turnRight", "turnRight", "moveForward");
        // }
        console.log(queue, "ADJACENT");
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
      if (Math.abs(targ[0][0]) == Math.abs(targ[0][1])) {
        // if(queue.length == 0) {
        //   queue.push("turnRight", "turnRight", "moveForward");
        // }
        console.log(queue, "ADJACENT");
        console.log(queue[0]);
        resolve(joystick.action(instance, agent, queue[0], 0));
      } else {
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

// let a = payload[x][0];
// let b = payload[x][1]

// if (Math.abs(payload[x][0]) == Math.abs(payload[x][1])) {
  
// }





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
