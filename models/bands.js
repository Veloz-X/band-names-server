const Band = require('./band');

class Bands{
    constructor(){
        this.bands = [];
    }
    addCandidate(band = new Band()){
        this.bands.push(band);
    }
    
    getCandidates(){
        return this.bands;
    }

    deleteCandidate(id = ''){
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteCandidate(id = ''){
        this.bands = this.bands.map(band => {
            if(band.id === id){
                band.votes++;
                return band;
            }else{
                return band;
            }
        });
    }

}
module.exports = Bands;