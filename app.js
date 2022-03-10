const axios = require('axios');
const joystick = require("./rev_joystick.js");
const host = "http://143.198.151.138:8089/api/simulations";

// Init sim instances
// axios.post(host + "/create", {
//   env_name: "Test1",
// })
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// })
// .then(function () {
//   axios.put(host + "/0/start")
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// });

// axios.post(host + "/create", {
//   env_name: "Test2",
// })
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// })
// .then(function () {
//   axios.put(host + "/1/start")
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// });

  // const map0 = await joystick.loadMap(host, "HW1");
  // const startRestart = await joystick.start(host, 2);

// Start sim
// axios.put(host + "/0/start")
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });

// Agent status
// axios.get(host + "/0/agents/0/status")
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });

//Agent action
// axios.post(host + "/0/agents/0/action", {
//   action: "pickUp",
//   mode: 12
// })
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });

// Step sim
// axios.put(host + "/0/step")
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });