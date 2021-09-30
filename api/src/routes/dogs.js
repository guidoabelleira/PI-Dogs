const { v4: uuidv4 } = require('uuid');

const express = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const axios = require('axios');


const router = express.Router();


const getApi = async function (){
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const infoApi = await info.data.map((e) => {
        return {
            name: e.name,
            id: e.id,
            weight_min: e.weight.metric.split(" - ")[0],
            weight_max: e.weight.metric.split(" - ")[1],
            height: e.height.metric,
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament
        }
    });
    return infoApi;
} // array 172 dogs

const getDb = async function (){
    const infoDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"], 
            through: {
              attributes: []
            }
          }
    });
    return infoDb;
}

const getAll = async function (){
    const apiDogs = await getApi();
    const dbDogs = await getDb();
    const allDogs = apiDogs.concat(dbDogs);
    return allDogs;
}


router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const dogsMain = await getAll();
        // const dogsMain = await aux.map(e => {
        //     return {
        //         id: e.id,
        //         image: e.image,
        //         name: e.name,
        //         temperament: e.temperament,
        //         weight_min: e.weight_min,
        //         weight_max: e.weight_max
        //     }
        // });
        if(name){
            let queryName = await dogsMain.filter((e) =>  
                e.name.toLowerCase().includes(name.toLowerCase())
                )
            if(queryName[0] === undefined){
                res.status(404).send("no se encontro name");
            } else {
                res.status(200).send(queryName);
            }
            
        } else {
            res.status(200).send(dogsMain);
        };
        
    } catch (error){
        console.log(error);
    };
    
});

router.get('/:id', async (req, res) => {
    
    try{
        const { id } = req.params;
        const aux = await getAll();
        if(id) {
            let paramsId = await aux.filter((e) => e.id.toString() === id.toString());
            if(paramsId.length) {
                res.status(200).json(paramsId);
            } else {
                res.status(400).send("no se encontro id");
            };
        } 
    } catch (error){
        console.log(error);
    };
  });

router.post('/', async (req, res) => {
    try {
        const { name, weight_min, weight_max, height, life_span, image, temperament } = req.body;
        const id = uuidv4();
        const newDog = await Dog.create({
            name, 
            id,
            weight_min,
            weight_max, 
            height, 
            life_span, 
            image
        });

        const temperamentDb = await Temperament.findAll({
            where: {name: temperament}
        });

        if(temperamentDb.length === 0){
            const newTemp = await Temperament.create({
                name: temperament
            })
            await newDog.addTemperament(newTemp);
        } else{
            await newDog.addTemperament(temperamentDb);
        }
        res.status(200).send("satisfactory answer");

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
