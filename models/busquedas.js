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
            
            const resp = await axios.get(`${baseURL}&language=es&access_token=${process.env.mapbox_key}`)

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.log(Error);
            
        }
        

        return []; //ciudades
    }

    async climaCiudad(lat, lon){
        try {
            const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

            const resp = await axios.get(`${baseURL}?lat=${lat}&lon=${lon}&appid=${process.env.openweather_key}&units=metric&lang=es`);


            return{
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Busquedas;
