const axios = require('axios');

class Busquedas{
    historial = [];

    constructor (){
        // TODO: leer DB
    }


    async ciudad(lugar = ''){
        //peticion http

        try {
            const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?types=place%2Cpostcode%2Caddress`;
            


    

            const resp2 = await axios.get(`${baseURL}&language=es&access_token=${process.env.mapbox_key}`)

            console.log(resp2.data)    
        } catch (error) {
            console.log(Error);
            
        }
        

        return []; //ciudades
    }
}

module.exports = Busquedas;
