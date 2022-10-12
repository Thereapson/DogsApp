const { Router } = require('express');
const router = Router();
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


const { Dog, Temper } = require('../db');
const {
    getAll,
    findByName,
    findTempers
} = require('./funtions');



router.get('/', async (req, res) => {
    // dogs?name=query
    var { name } = req.query;
    if (name === undefined) {
        try {
            let allDogsApi = await getAll();
            let allDogsDb = await Dog.findAll({ include: Temper });
            allDogsDb = allDogsDb ? allDogsDb.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    height: e.height,
                    weight: e.weight,
                    life_span: e.life_span,
                    img: e.img,
                    tempers: e.tempers.length ? e.tempers.map(u => { return u.name }) : []
                }
            }) : []
            res.json(allDogsApi.concat(allDogsDb))
        } catch (error) {
            console.log(error);
            res.send("error")
        }
    } else {
        try {
            let dogByName = await findByName(name);
            res.json(dogByName);
        } catch (error) {
            console.log(error)
            res.send("error")
        }
    }
});

router.get('/api', async (req, res) => {
    try {
        let allApi = await getAll();
        res.json(allApi)
    } catch (error) {
        console.log(error)
        res.send("error")
    }
})

router.get('/db', async (req, res) => {
    try {
        let allDB = await Dog.findAll({ include: Temper });
        allDB = allDB ? allDB.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height,
                weight: e.weight,
                life_span: e.life_span,
                img: e.img,
                tempers: e.tempers.length ? e.tempers.map(u => { return u.name }) : []
            }
        }) : []
        res.json(allDB)
    } catch (error) {
        console.log(error)
        res.send("error")
    }
})

router.get('/:id', async (req, res) => {
    var { id } = req.params

    try {
        let idDogApi = await getAll();
        let result = await idDogApi.filter((e) => {
            if (parseInt(id) === e.id) { return e }
            return false
        });
        let idDogDb = await Dog.findAll({
            where: {
                id: id
            },
            include: Temper
        })
        idDogDb = idDogDb ? idDogDb.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height,
                weight: e.weight,
                life_span: e.life_span,
                img: e.img,
                tempers: e.tempers.length ? e.tempers.map(u => { return u.name }) : []
            }
        }) : []
        idDogDb.length ? res.json(idDogDb[0]) : res.json(result[0])
    } catch (error) {
        console.log(error)
        res.send("error")
    }
});





let id = 999

router.post('/', async (req, res) => {
    id++;

    let all = await Temper.findAll();
    try {
        if (all.length === 0) {
            await findTempers();
            all = await Temper.findAll();
        }

        let { name, height, weight, life_span, temperament } = req.body


        if (name && height && weight) {
            const newDog = await Dog.create({
                id,
                name, height, weight, life_span, temperament,
            })
            console.log(temperament)
            temperament ? await newDog.addTemper(temperament) : null;
            const Doge = await Dog.findOne(({ where: { id: id }, include: Temper }));
            res.send({ successful: true, message: "nuevo perro creado", DATA: Doge })
        } else { res.send({ successful: false, message: "Se requiere un nombre" }) }
    } catch (error) {
        console.log(error)
        res.send('error')
    }

})







module.exports = router;