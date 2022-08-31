const {io} = require('../index');

//MENSAJES DE SOCKETS
io.on('connection', (client) => {
    console.log('New user connected');

    client.on('disconnect', () => {
        console.log('User disconnected');
    } );
    client.on('mensaje', (payload) => {
        console.log('-- MENSAJE !! ---',payload);
        io.emit('mensaje', payload);
    });
});