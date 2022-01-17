const inquirer = require('inquirer');
require('colors');

const options = [
    {
        type: 'list',
        name: 'opcion',
        message:'¿Qué desea hacer?',
        choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name:  `${'2.'.green} Historial`
        },
        {
            value: 0,
            name: `${'0.'.red} Salir`
        }
    ]
    }
]



const inquirerMenu = async()=>{
    console.clear();
    console.log('======================='.green);
    console.log('Seleccione una opción'.white);
    console.log('=======================\n'.green);

    const {opcion} = await inquirer.prompt(options);

    return opcion;

}

const pausa = async()=>{
    const pausaMsg = [
        {
            type: 'input',
            name: 'salida',
            message:`\nPresione ${'ENTER'.green} para continuar\n`,

        }
    ];
    
    console.log('\n');

    await inquirer.prompt(pausaMsg);
}

const leerInput = async(message)=> {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }

    }];
    const {desc} = await inquirer.prompt(question);

    return desc;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}