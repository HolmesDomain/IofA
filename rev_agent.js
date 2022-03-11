const axios = require('axios');
const joystick = require("./rev_joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

let turnBack = ["turnRight", "turnRight", "moveForward"];
let turnBack2 = ["turnRight", "turnRight", "moveForward"];

class Agent {
    payloaded = "possesion info";
    home = "home info";
    payload = "payload info";
    agents = "nearby agents";

  constructor(agent, _instance) {
    this.ID = agent;
    this.instance = _instance;
  }

  get home() {
    return this.home;
  }

  get payload() {
    return this.payload;
  }

  get agents() {
    return this.agents;
  } 

  get payloaded() {
    return this.payloaded;
  }

  set payloaded(value) {
    this.payloaded = value;
  }

  set payload(value) {
    this.payload = value;
  }

  set home(value) {
    this.home = value;
  }

  set agents(value) {
    this.agents = value;
  }

  getScan() {
    return new Promise((resolve, reject) => {
      axios.get(host + "/" + this.instance + "/agents/" + this.ID +  "/status")
      .then(function (response) {
        // this.payloaded = response.data.agentData.Status.Payload;
        // this.agents = response.data.agentData.Scan.Agents;
        // this.payload = response.data.agentData.Scan.Payloads;
        // this.home = response.data.agentData.Scan.Home;
        // console.log(this.payload[1]);
        // console.log(Math.abs(scan.payload[1]));
        resolve();
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
    })
  }

  goHome(targ) {
    return new Promise((resolve, reject) => {
      try {
        if (Math.abs(targ[0][0]) == Math.abs(targ[0][1])) {
          console.log(turnBack, "ADJACENT home");
          console.log(turnBack[0]);
          resolve(joystick.action(this.instance, this.ID, turnBack[0], 0));
        } else {
          if(targ[0][0] > 0) {
            resolve(joystick.action(this.instance, this.ID, "turnRight", 0));
          } else if (targ[0][0] < 0) {
            resolve(joystick.action(this.instance, this.ID, "turnLeft", 0));
          } else if (targ[0][0] == 0 && targ[0][1] == 1) {
            resolve(joystick.action(this.instance, this.ID, "drop", 0));
          } else if (targ[0][0] == 0 && targ[0][1] > 0) {
            resolve(joystick.action(this.instance, this.ID, "moveForward", 0));
          }
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  getPayload(targ) {
    return new Promise((resolve, reject) => {
      try {
        console.log("payload if")
        if (Math.abs(targ[0][0]) == Math.abs(targ[0][1])) {
          console.log(turnBack2, "ADJACENT payload");
          console.log(turnBack2[0]);
          resolve(joystick.action(this.instance, this.ID, turnBack2[0], 0));
        } else {
          console.log("payload else")
          if(targ[0][0] > 0) {
            resolve(joystick.action(this.instance, this.ID, "turnRight", 0));
          } else if (targ[0][0] < 0) {
            resolve(joystick.action(this.instance, this.ID, "turnLeft", 0));
          } else if (targ[0][0] == 0 && targ[0][1] == 1) {
            resolve(joystick.action(this.instance, this.ID, "pickUp", 0));
          } else if (targ[0][0] == 0 && targ[0][1] > 0) {
            resolve(joystick.action(this.instance, this.ID, "moveForward", 0));
          }
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  think() {
    return new Promise((resolve, reject) => {
      this.getScan().then(function(response) {
        if (this.payloaded() >= 0) {
          console.log("I do have a payload")
          if (this.home().length == 0) {
            return joystick.action(this.instance, this.ID, "idle", 0);
          } else {
            return this.goHome(this.home())
            .then((response) => {
              turnBack.shift();
            });
          }
        } else {
          if(this.payload().length != 0) {
            console.log("I don't have a payload")
            if(this.payload().length > 1) {
              console.log(">1 payload")
              return this.getPayload(this.payload());
            } else {
              console.log("I have less than 1 payload");
              // console.log(scan.payload);
              return this.getPayload(this.payload())
              .then((response) => {
                turnBack2.shift();
              });
            }
          } else {
            return this.goHome(this.home());
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
}

exports.Agent = Agent;
