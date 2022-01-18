require('dotenv').config();

const {inquirerMenu, pausa, leerInput, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () =>{
    let opt = 0;
    const busquedas = new Busquedas();



    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:     
            const lugar = await leerInput('Ciudad:');

            const ciudades = await busquedas.ciudad(lugar);

            if(!ciudades.length){
                console.log('No se encontraron ciudades');
                break;
            }
            const id = await listarLugares(ciudades);
            if(id === '0') continue;

            const lugarSel = ciudades.find(l=> l.id === id);

            busquedas.agregarHistorial(lugarSel.nombre);
     
            console.log('Cargando...');
            const {desc, min, max, temp} = await busquedas.climaCiudad(lugarSel.lat, lugarSel.lng);
            
            console.clear();

            console.log('\nInformación de la ciudad\n'.green)
            console.log('Ciudad: ', lugarSel.nombre.cyan);
            console.log('Latitud: ', lugarSel.lat);
            console.log('Longitud: ', lugarSel.lng);

            console.log('Temperatura actual: ', temp);
            console.log('Temperatura mínima: ', min);
            console.log('Temperatura máxima: ', max);
            console.log('Descripción: ', desc.cyan);

     
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }
        
        if(opt!==0) await pausa();
 
        
    }while(opt !== 0)




}

main();