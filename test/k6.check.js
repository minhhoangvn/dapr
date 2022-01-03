import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
    connectWS();
}
function connectWS() {
    const wssURL = "ws://localhost:9999/ws";
    console.log(wssURL);
    const response = ws.connect(wssURL, {
        headers: {
            "accept-version": "1.1,1.0",
            "heart-beat": "0,0",
            "login": "user",
            "passcode": "pass"
        }
    }, (socket) => {
        socket.on('open', () => {
            console.log('WS connected');
            socket.send("CONNECT\naccept-version:1.1,1.0\nheart-beat:0,0\n\n\u0000");
        });
        socket.on('pong', () => console.log('pong message'));
        socket.on('connection', (data) => console.log('WS message received: ', data));
        socket.on('message', (data) => {
            console.log('WS message received: ', data);
        });
        socket.on('close', () => console.log('WS disconnected'));
        socket.on('error', (e) => {
            if (e.error() != 'websocket: close sent') {
                console.log('An unexpected error occurred: ', e.error());
            }
        });

        socket.setInterval(function timeout() {
            const msg = { "name": `Minh Text ${data.ZALOPAY_ID}` };
            console.log(JSON.stringify(msg));
            console.log(JSON.stringify(msg).length);
            socket.ping();
            socket.send(`SEND\ndestination:/app/hello\ncontent-length:${JSON.stringify(msg).length}\n\n${JSON.stringify(msg)}\u0000`)
            socket.send(`SEND\ndestination:/app/play\ncontent-length:${JSON.stringify(msg).length}\n\n${JSON.stringify(msg)}\u0000`)
        }, 100);

        socket.setTimeout(function () {
            console.log('20 seconds passed, closing the socket');
            socket.close();
        }, 5000);
    });

    console.log(JSON.stringify(response));
    check(response, { 'status is 101': (r) => r && r.status === 101 });
}
