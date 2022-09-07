const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('Lista A'));
bands.addBand(new Band('Lista B'));
bands.addBand(new Band('Lista C'));
console.log(bands);
console.log('INICIANDO SERVIDOR');
//MENSAJES DE SOCKETS
io.on('connection', (client) => {
    console.log('New user connected');

    client.emit('active-candidates', bands.getBands());

    client.on('disconnect', () => {
        console.log('User disconnected');
    } );
    // client.on('mensaje', (payload) => {
    //     console.log('-- MENSAJE !! ---',payload);
    //     io.emit('mensaje', payload);
    // });
    client.on('vote-candidate', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-candidates', bands.getBands());
    });

    client.on('add-candidate', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-candidates', bands.getBands());
    });
    
    client.on('delete-candidate', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-candidates', bands.getBands());
    });

});