const axios = require('axios').default;
const host = "http://143.198.151.138:8089/api/simulations";

async function action(instance, agent, action, mode) {
  axios.post(host + "/" + instance + "/agents/" + agent + "/action", {
    action: action,
    mode: mode
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  await sleep(1500);
}

// async function loadLevel(level) {

// }

async function endTurn(instance) {
  axios.put(host + "/" + instance + "/step")
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  await sleep(1500);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// async function do180(instance, agent, mode) {
//   axios.post(host + "/" + instance + "/agents/" + agent + "/action", {
//     action: "turnRight",
//     mode: mode
//   })
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     axios.post(host + "/" + instance + "/agents/" + agent + "/action", {
//       action: "turnRight",
//       mode: mode
//     })
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//   });
//   await sleep(1500);
// }

exports.action = action;
exports.endTurn = endTurn;
