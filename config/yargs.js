const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    demand: true,
    alias: 'c',
    default: true,
    desc: 'Marca la tarea como completada'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('listar', 'Mostrar todas las tareas por hacer', {})
    .command('actualizar', 'Actualiza una tarea por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea de la lista', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}