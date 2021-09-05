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
        include: Temperament
    });
    console.log(infoDb.length)
    return infoDb;
}



router.get('/', async (_req, res, next) => {
    try {
        const apiDogs = await getApi();
        const dbDogs = await getDb();
        const allDogs = apiDogs.concat(dbDogs);
        res.send(allDogs[172]);
    } catch (error){
        console.log(error);
    }
    
});

router.post('/', async (req, res, next) => {
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

        await newDog.addTemperament(temperamentDb);
        res.send(newDog);

    } catch (error) {
        console.log(error)
    }
});


// router.get('/:idPais', async (req, res, next) => {
//     const idPais = req.params.idPais;
//     if(!idPais){
//         return next({msg: 'Id Pais incorrecto', status: 500});
//     }
//     // var country;
//     try {
//         if(typeof idPais === 'string' && idPais.length === 3){
//             let country = await Country.findByPk(idPais, {
//                 include: Activity
//             });
//             if(country === null){
//                 return next(error);
//             }
//             return res.json(country);
//         }
//     } catch (error){
//         return next(error);
//     }
// })

// router.get('/:name', async (req, res, next) => {
//     const {nameF} = req.params;
//     if(!nameF){
//         return next({msg: 'Name Pais incorrecto', status: 500});
//     }
//     try {
//         if(typeof nameF === 'string'){
//             let country = await Country.findOne({
//                 where: {
//                     name: nameF
//                 }
//             });
//             if(country === null){
//                 return next(error);
//             }
//             return res.json({country});
//         }
//     } catch (error){
//         return next(error);
//     }
// })


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