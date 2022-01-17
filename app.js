
const {inquirerMenu, pausa, leerInput} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () =>{
    let opt = 0;
    const busquedas = new Busquedas();



    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:     
            const lugar = await leerInput('Ciudad:');

            console.log(lugar);
                
            console.log('\nInformación de la ciudad\n'.green)
            console.log('Ciudad: ');
            console.log('Latitud: ');
            console.log('Longitud: ');
            console.log('Temperatura actual: ');
            console.log('Temperatura mínima: ');
            console.log('Temperatura máxima: ');

                break;
            case 2:
                break;
        }
        
        if(opt!==0) await pausa();
 
        
    }while(opt !== 0)

    console.log({opt});


}

main();