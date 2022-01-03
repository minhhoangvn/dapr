const { StompHeaders, StompError, StompServerCommandListener, createStompClientSession } = require('stomp-protocol');
const { Socket, createConnection } = require('net');

const listener = { // 1) define a listener for server-sent frames.
    connected(headers) {
        console.log('Connected!', headers);
    },
    message(headers, body) {
        console.log('Message!', body, headers);
    },
    receipt(headers) {
        console.log('Receipt!', headers);
    },
    error(headers, body) {
        console.log('Error!', headers, body);
    },
    onProtocolError(error) {
        console.log('Protocol error!', error);
    },
    onEnd() {
        console.log('End!');
    }
};

const socket = createConnection(9999, '127.0.0.1'); // 2) Open raw TCP socket to the server.

const client = createStompClientSession(socket, listener); // 3) Start a STOMP Session over the TCP socket.

client.connect({ login: 'user', passcode: 'pass' }).catch(console.error); // 4) Send the first frame!