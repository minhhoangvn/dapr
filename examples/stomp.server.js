const {  StompHeaders, StompError, StompClientCommandListener, createStompServerSession, StompServerSessionLayer } = require('stomp-protocol');

const { Socket, createServer } = require('net');


const testServer = (socket) => {
    // 1) create a listener for incoming raw TCP connections.


    const listener = {
        // 2) define a listener for client-sent frames.

        connect(headers) {
            console.log('Connect!', headers);
            if (headers && headers.login === 'user' && headers.passcode === 'pass') {
                sessionLayerServer.connected({ version: '1.2', server: 'MyServer/1.8.2' }).catch(console.error);
            } else {
                sessionLayerServer.error({ message: 'Invalid login data' }, 'Invalid login data').catch(console.error);
            }
        },
        send(headers, body) {
            console.log('Send!', body, headers);
        },
        subscribe(headers) {
            console.log('subscription done to ' + (headers && headers.destination));
        },
        unsubscribe(headers) {
            console.log('unsubscribe', headers);
        },
        begin(headers) {
            console.log('begin', headers);
        },
        commit(headers) {
            console.log('commit', headers);
        },
        abort(headers) {
            console.log('abort', headers);
        },
        ack(headers) {
            console.log('ack', headers);
        },
        nack(headers) {
            console.log('nack', headers);
        },
        disconnect(headers) {
            console.log('Disconnect!', headers);
        },
        onProtocolError(error) {
            console.log('Protocol error!', error);
        },
        onEnd() {
            console.log('End!');
        }
    };

    const sessionLayerServer = createStompServerSession(socket, listener);  // 3) Start a STOMP Session over the TCP socket.

}

const tcpServer = createServer(testServer); // 4) Create a TCP server
tcpServer.listen(9999, 'localhost', () => {
    console.log(' [*] Listening on 0.0.0.0:9999');
}); // 5) Listen for incoming connections