const {io} = require('../index');
const Candidate = require('../models/candidate');
const Candidates = require('../models/candidates');
const candidates = new Candidates();
candidates.addCandidate(new Candidate('Lista A - Juan Perez'));
candidates.addCandidate(new Candidate('Lista B - Pedro Sanchez'));
candidates.addCandidate(new Candidate('Lista C - Maria Lopez'));
console.log(candidates);
console.log('INICIANDO SERVIDOR');
//MENSAJES DE SOCKETS
io.on('connection', (client) => {
    console.log('New user connected');

    client.emit('active-candidates', candidates.getCandidates());

    client.on('disconnect', () => {
        console.log('User disconnected');
    } );
    client.on('vote-candidate', (payload) => {
        candidates.voteCandidate(payload.id);
        io.emit('active-candidates', candidates.getCandidates());
    });
    client.on('add-candidate', (payload) => {
        const newCandidate = new Candidate(payload.name);
        candidates.addCandidate(newCandidate);
        io.emit('active-candidates', candidates.getCandidates());
    });
    client.on('delete-candidate', (payload) => {
        candidates.deleteCandidate(payload.id);
        io.emit('active-candidates', candidates.getCandidates());
    });

});