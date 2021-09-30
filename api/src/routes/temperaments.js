const express = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');

const router = express.Router();

const getApi = async function (){
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const infoApi = await info.data.map((e) => {
        const result = e.temperament;
        return result;
    });
    
    const allTemperaments = infoApi.map((e) => e && e.split(", ")).flat();


    async function filterTemp (array){
        let aux = array.filter(a => a !== undefined);

        let filtrados = [];
        for(let i = 0; i < aux.length; i++){
            let index = aux[i];
            filtrados.push(index);
            aux = aux.filter(a => a !== index)
        }

        return filtrados;
    }
    const temperamentsApi = await filterTemp(allTemperaments);
    return temperamentsApi;
} 

router.get('/', async (_req, res) => {
    try {
        const temperamentDb = await Temperament.findAll();
        const api = await getApi();

        if(temperamentDb.length === 0){
            api.forEach( async (el) => {
                await Temperament.create({
                    name: el
                })
            })
            const bdCreated = await Temperament.findAll();
            res.send(bdCreated)
        } else {
            res.send(temperamentDb);
        }
    } catch (error){
        console.log(error);
    }
});


module.exports = router;