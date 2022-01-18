const fs = require('fs');
const axios = require('axios');

class Busquedas{
    historial = [];
    dbPath = './db/database.json';

    constructor (){
        // TODO: leer DB
        this.leerDB();
    }


    get historialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
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

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0,4);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if(fs.existsSync(this.dbPath)){

            const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})

            const data = JSON.parse(info);

            this.historial = data.historial;
        }
    }
}



module.exports = Busquedas;
