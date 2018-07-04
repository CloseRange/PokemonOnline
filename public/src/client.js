
var client = {
  socket: null,
  init: function(link) {
    client.socket = io.connect(link);
  },
  send: function(data, key) {
    if(!key) key = "send";
    client.socket.emit(key, data);
  }
}
