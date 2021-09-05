const express = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const router = express.Router();

const getApi = async function (){
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    // const allTemperaments = [];
    const infoApi = await info.data.map((e) => {
        const result = e.temperament;
        // console.log(result);
        return result;
    });
    // infoApi = [...new Set(infoApi.sort())];
    console.log(infoApi[1])
    // for(i = 0; i < infoApi.length; i++){
    //     var sep = infoApi[i];
    //     console.log(sep)
    //     // sep.split(', ');
    //     allTemperaments.push(sep);
    // }
    const allTemperaments = infoApi.map((e) => e && e.split(", ")).flat();
    console.log("split", allTemperaments)
    // const res = allTemperaments.flat(2);
    // console.log("flat", res);
    console.log("aca", infoApi)
    return infoApi;
} 

// const getDb = async function (){
//     const infoDb = await Dog.findAll({
//         include: Temperament
//     });
//     console.log(infoDb.length)
//     return infoDb;
// }



router.get('/', async (_req, res, next) => {
    try {
        await getApi();
        res.send('temperaments');
    } catch (error){
        console.log(error);
    }
});

// GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 



module.exports = router;