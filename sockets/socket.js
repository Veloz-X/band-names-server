const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addCandidate(new Band('Lista A'));
bands.addCandidate(new Band('Lista B'));
bands.addCandidate(new Band('Lista C'));
console.log(bands);
console.log('INICIANDO SERVIDOR');
//MENSAJES DE SOCKETS
io.on('connection', (client) => {
    console.log('New user connected');

    client.emit('active-candidates', bands.getCandidates());

    client.on('disconnect', () => {
        console.log('User disconnected');
    } );
    client.on('vote-candidate', (payload) => {
        bands.voteCandidate(payload.id);
        io.emit('active-candidates', bands.getCandidates());
    });
    client.on('add-candidate', (payload) => {
        const newBand = new Band(payload.name);
        bands.addCandidate(newBand);
        io.emit('active-candidates', bands.getCandidates());
    });
    client.on('delete-candidate', (payload) => {
        bands.deleteCandidate(payload.id);
        io.emit('active-candidates', bands.getCandidates());
    });

});