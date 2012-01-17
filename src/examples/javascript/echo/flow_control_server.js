load('core/net.js')

var server = new vertx.NetServer();

server.connectHandler(function(sock) {
  sock.dataHandler(function(data) {
    sock.write(data);
    if (sock.writeQueueFull()) {
      sock.pause();
      sock.drainHandler(function() {
        sock.resume();
      })
    }
  })
})

server.listen(8080, 'localhost');

function vertxStop() {
  server.close
}
