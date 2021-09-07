const express = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const router = express.Router();

const getApi = async function (){
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const infoApi = await info.data.map((e) => {
        const result = e.temperament;
        // console.log(result);
        return result;
    });
    
    const allTemperaments = infoApi.map((e) => e && e.split(", ")).flat();
    // console.log("split", allTemperaments);

    async function filterTemp (array){
        let aux = array.filter(a => a !== undefined);
        // console.log("filtro undefined", aux.length)
        let filtrados = [];
        for(let i = 0; i < aux.length; i++){
            let index = aux[i];
            filtrados.push(index);
            aux = aux.filter(a => a !== index)
        }
        // console.log("filtro?",filtrados.length);
        return filtrados;
    }
    const temperamentsApi = await filterTemp(allTemperaments);
    return temperamentsApi;
} 

router.get('/', async (_req, res, next) => {
    try {
        const temperamentDb = await Temperament.findAll();
        const api = await getApi();
        console.log(temperamentDb)
        if(temperamentDb.length === 0){
            api.forEach( async (el) => {
                await Temperament.create({
                    name: el
                })
            })
            console.log("creada bd temperaments");
            const bdCreated = await Temperament.findAll();
            res.send(bdCreated)
        } 
        res.send(temperamentDb);
    } catch (error){
        console.log(error);
    }
});

// GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 



module.exports = router;