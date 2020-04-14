import * as http from 'http';
import app from '../app';

// Setting port
const port = 3000;
app.set('port', 3000);

// Create HTTP Server
const server: http.Server = new http.Server(app);

// Server start, Checking Server status
server.listen(port);
server.on('error', (e: any) => {
  switch (e.code) {
    case 'EACCES':
      console.error('requires elevated privileges');
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      break;
    default:
      throw e;
  }
});
server.on('listening', () => {
  const addr: any = server.address();
  const bind: any =
    typeof addr === 'string' ? 'pipe' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
