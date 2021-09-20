const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

//SERVER SETUP
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
  maxPayload: 128 * 1024
});

// GENERATE A UNIQUE ID FOR EACH CONNECTION
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

//ALL ACTIVE CONNECTIONS ARE MAINTAINED HERE
const clients = {};

let result = {};
let rrbf = [];
let callput = []
let index = 0;

//FUNCTION TO SEND MESSAGE TO THE CLIENT
const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  //ACCEPTING INCOMING CONNECTIONS
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(Object.keys(clients).length+' clients connected with ids: ' + Object.getOwnPropertyNames(clients));
  //SENDING A MESSAGE EVERY 1 SECOND
  setInterval(function () {
    rrbf = {
      time: index+"rrbf",
      exp_date: new Date(),
      atm: 1,
      "25d_rr": 0.2,
      "10d_rr": 0.2,
      "25d_bf": 0.2,
      "10d_bf": 0.2
    };
    callput = {
      time: index+"cp",
      exp_date: new Date(),
      atm: 1,
      "25d_rr": 0.2,
      "10d_rr": 0.2,
      "25d_bf": 0.2,
      "10d_bf": 0.2
    };
    index++;
    result = { rrbf, callput }
    sendMessage(JSON.stringify(result));
  }, 1000);

  // WHEN USER DISCONNECTED
  connection.on('close', function (connection) {
    console.log((new Date()) + " Peer disconnected.");
    delete clients[userID];
    sendMessage(JSON.stringify("disconnected"));
  });
});
