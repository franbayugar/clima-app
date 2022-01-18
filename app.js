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
            const lugarSel = ciudades.find(l=> l.id === id);
            
            const {desc, min, max, temp} = await busquedas.climaCiudad(lugarSel.lat, lugarSel.lng);
            

            console.log('\nInformación de la ciudad\n'.green)
            console.log('Ciudad: ', lugarSel.nombre.red);
            console.log('Latitud: ', lugarSel.lat);
            console.log('Longitud: ', lugarSel.lng);

            console.log('Temperatura actual: ', temp);
            console.log('Temperatura mínima: ', min);
            console.log('Temperatura máxima: ', max);
            console.log('Descripción: ', desc.red);

                break;
            case 2:
                break;
        }
        
        if(opt!==0) await pausa();
 
        
    }while(opt !== 0)

    console.log({opt});


}

main();