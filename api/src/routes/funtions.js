const axios = require('axios');
const { Dog, Temper } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;



let dogsData = []
let temperData = []

async function getAll() {
    if (dogsData.length > 50) return dogsData
    try {
        let allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds`)
            .then((resp) => {
                let todo = resp.data;
                return todo.map((e) => {
                    let a = e.temperament ? e.temperament.split(',') : []
                    a = a.map(e => e.trimStart())
                    return {
                        id: e.id,
                        name: e.name,
                        height: e.height.metric,
                        weight: e.weight.metric.split(' - '),
                        life_span: e.life_span,
                        tempers: a.length ? a : null,
                        img: e.image.url,
                        origin: e.origin
                    }
                })
            })
        dogsData = allDogs;
        return dogsData;
    } catch (error) {
        console.log('ERROR API ORIGINAL', error)
    }
}

async function findByName(name) {
    littelName = name.toLowerCase();
    try {
        let oneDogApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${littelName}`)
            .then((resp) => {
                let one = resp.data;
                return one.map((e) => {
                    let a = e.temperament ? e.temperament.split(',') : []
                    a = a.map(e => e.trimStart())
                    return {
                        id: e.id,
                        name: e.name,
                        height: e.height.metric,
                        weight: e.weight.metric.split(' - '),
                        life_span: e.life_span,
                        tempers: a.length ? a : null,
                        origin: e.origin
                        // img: e.image.url,
                    }
                })
            });
        let onedogDB = await Dog.findAll({
            where: {
                name: { [Op.like]: `%${littelName}%` }
            },
            include: Temper
        });
        onedogDB = onedogDB ? onedogDB.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height,
                weight: e.weight,
                life_span: e.life_span,
                img: e.img,
                origin: e.origin,
                tempers: e.tempers.length ? e.tempers.map(u => { return u.name }) : []
            }
        }) : []
        return oneDogApi.concat(onedogDB)
    } catch (error) {
        console.log('ERROR AL BUSCAR RAZA', error)
    }
}


async function findTempers() {

    try {
        let allTempers = await axios.get(`https://api.thedogapi.com/v1/breeds`)
            .then((resp) => {
                let todos = resp.data;
                return todos.map((e) => {
                    return e.temperament ? e.temperament.split(',') : []
                })
            })

        temperData = temperData.concat.apply(temperData, allTempers).map((e) => {
            return e.trimStart()
        })

        temperData = temperData.filter((e, index) => {
            if (temperData.indexOf(e, 1) == index) return true
            return false
        })

        for (i = 0; i < temperData.length; i++) {
            await Temper.create({
                name: temperData[i], id: temperData[i].toLowerCase()
            })
        }
        console.log('Datos subidos a la DB')

    } catch (error) {
        console.log("ERROR AL BUSCAR TEMPERAMENTOS", error)
    }
}





module.exports = {
    getAll,
    findByName,
    findTempers
};