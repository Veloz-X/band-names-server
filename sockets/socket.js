const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('Banda#1'));
bands.addBand(new Band('Banda#2'));
bands.addBand(new Band('Banda#3'));
console.log(bands);

console.log('INICIANDO SERVIDOR');
//MENSAJES DE SOCKETS
io.on('connection', (client) => {
    console.log('New user connected');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('User disconnected');
    } );
    client.on('mensaje', (payload) => {
        console.log('-- MENSAJE !! ---',payload);
        io.emit('mensaje', payload);
    });
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        // console.log(payload);
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {
    //     // console.log('nuevo-mensaje', payload);
    //     // io.emit('nuevo-mensaje', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
});