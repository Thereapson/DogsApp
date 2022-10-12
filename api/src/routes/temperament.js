const { Router } = require('express');
const router = Router();
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Dog, Temper } = require('../db');
const { findTempers } = require('./funtions');



router.get('/', async (req, res) => {

    let allTemperDB = await Temper.findAll();

    if (allTemperDB.length > 121) {
        res.json(allTemperDB)
    } else {
        try {
            await findTempers();
            let allTempersDb = await Temper.findAll();
            res.json(allTempersDb)
        } catch (error) {
            console.log(error);
            res.send("error")
        }
    }

})

module.exports = router;