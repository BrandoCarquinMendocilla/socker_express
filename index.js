const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

app.post('/execute-socket', (req, res) => {
    const parametros = req.body;
    io.emit('send-alert', parametros);
    res.status(200).send({ message: 'Datos recibidos y enviados a los clientes.' });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
