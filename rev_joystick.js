const axios = require('axios');
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
      console.log(error.data);
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
      console.log(err.data);
      reject(err.data);
    });
  })
}

function loadMap(host, env) {
  return new Promise((resolve, reject) => {
    axios.post(host + "/create", {
      env_name: env,
    })
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.log(error.data);
      reject(error);
    })
  });
}

function start(host, instance) {
  return new Promise((resolve, reject) => {
    axios.put(host + "/" + instance + "/start")
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.log(error.data);
      reject(error);
    })
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

exports.action = action;
exports.endTurn = endTurn;
exports.loadMap = loadMap;
exports.start = start;
