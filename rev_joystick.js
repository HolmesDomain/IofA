const axios = require('axios').default;
const host = "http://143.198.151.138:8089/api/simulations";

function action(instance, agent, action, mode) {
  return new Promise((resolve, reject) => {
    axios.post(host + "/" + instance + "/agents/" + agent + "/action", {
      action: action,
      mode: mode
    })
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.log(error);
      reject(error);
    });
  })
}

function endTurn(instance) {
  return new Promise((resolve, reject) => {
    axios.put(host + "/" + instance + "/step")
    .then(function (response) {
      resolve(response);
    })
    .catch(err => { 
      console.log(err);
      reject(err);
    });
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

exports.action = action;
exports.endTurn = endTurn;
