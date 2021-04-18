const fs = require('fs');
const color = require('colors');

let listadoPorHacer = [];


const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


const getListado = () => {
    cargarDB();
    var tarea = listadoPorHacer;
    console.log('========= To Do list============'.green);
    for (let listado of tarea) {
        console.log('Descripción: ', listado.descripcion);
        console.log('Completado: ', listado.completado);
        console.log('--------------------------------------------'.yellow);
    }
    console.log('================================'.green);
}


const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();


    /*  MI FORMA DE TRABAJARLO 
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        if (index >= 0) {
            listadoPorHacer.splice(index, 1);
            guardarDB();
            return ("Tarea eliminada".green);
        } else {
            return ("Error al eliminar la tarea".red);
        }
    */

    let nuevoListdo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListdo.length) {
        return ("Error al eliminar la tarea".red);
    } else {
        listadoPorHacer = nuevoListdo;
        guardarDB();
        return ("Tarea eliminada".green);
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}