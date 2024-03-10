var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors'); // Importa el middleware CORS

app.use(cors()); // Habilita CORS para todas las solicitudes

app.use(express.static('client'))

// Ruta
app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

//Array de mensajes
var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de Ivan Goncalves',
    nickname: 'Bot - IvanGoncalves'
}];

// Conexión al socket
io.on('connection', function (socket) {
    console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado...");

    //Emitimos el array al cliente
    socket.emit('messages', messages);

    //Después de crear la function donde se emiten el mensaje en el documento del cliente (funcion addMEssage)
    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});


server.listen(6677, function () {
    console.log('El servidor está funcionando en http://localhost:6677')
});


