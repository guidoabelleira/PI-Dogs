const express = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');


const router = express.Router();


const getApi = async function (){
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const infoApi = await info.data.map((e) => {
        // console.log(e.weight.metric)
        return {
            name: e.name,
            id: e.id,
            weight: e.weight.metric,
            height: e.height.metric,
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament
        }
    });
    console.log(infoApi.length)
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
    console.log(infoDb.length)
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
        const aux = await getAll();
        const dogsMain = await aux.map(e => {
            return {
                image: e.image,
                name: e.name,
                temperament: e.temperament,
                weight: e.weight
            }
        });
        if(name){
            // console.log(name.toLowerCase().slice(1, -1));
            // console.log(dogsMain[4].name.toLowerCase())
            let queryName = await dogsMain.filter((e) =>  
                e.name.toLowerCase().includes(name.toLowerCase())
                )
            console.log(queryName);
            if(queryName[0] === undefined){
                res.send("no se encontro name");
            } else {
                res.send(queryName);
            }
            
        } else {
            res.send(dogsMain);
        };
        
    } catch (error){
        console.log(error);
    };
    
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const aux = await getAll();
        if(id) {
            let paramsId = await aux.filter((e) => e.id.toString() === id.toString());
            if(paramsId[0] !== undefined) {
                res.send(paramsId);
            } else {
                res.send("no se encontro id");
            };
        } else {
            res.send("ingrese id valido");
        }
    } catch (error){
        console.log(error);
    };
  });

router.post('/', async (req, res) => {
    try {
        const { name, id, weight, height, life_span, image, temperament } = req.body;

        const newDog = await Dog.create({
            name, 
            id, 
            weight, 
            height, 
            life_span, 
            image
        });

        const temperamentDb = await Temperament.findAll({
            where: {name: temperament}
        });
        // console.log("1", temperamentDb, temperament);

        if(temperamentDb.length === 0){
            const newTemp = await Temperament.create({
                name: temperament
            })
            // console.log("creado temperamento");
            await newDog.addTemperament(newTemp);
        } else{
            await newDog.addTemperament(temperamentDb);
        }
        // console.log("2", temperamentDb)
        res.send(newDog);

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;





// GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
//  GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
//  GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados



// POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos