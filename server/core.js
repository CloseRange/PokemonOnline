
var server = require("./libs/server");
var color = require("./libs/color");

console.log(color.red, "Test Message");

server.init(3000, "Pokemon", color.red);
