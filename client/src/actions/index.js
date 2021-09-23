import axios from 'axios';
import { DOGS_URL, TEMPERAMENTS_URL } from '../constantes';
import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, GET_TEMPERAMENTS, SET_ORDER, SET_ORDER_WEIGTH, SET_ORDER_DB, ADD_DOG } from "./actionsTypes";


export function getDogs() {
    return async function(dispatch) {
        const dogs = await axios.get(DOGS_URL);
            dispatch({
                type: GET_DOGS,
                payload: dogs.data
            })   
    };
};
// ver actualizacion estado filtro 
export function getDogByName(name) {
    return async function(dispatch){
        const dogsByName = await axios.get(DOGS_URL + '?name=' + name)
        console.log(dogsByName.data)
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogsByName.data
            }) 
    }
}

export function getDogById(id) {
    return async function(dispatch){
        try {
        const dogsById = await axios.get(DOGS_URL + id)
            dispatch({
                type: GET_DOGS_BY_ID,
                payload: dogsById.data[0]
            }) 
            // console.log("action byid", dogsById.data[0].name)
        } catch (error){
            console.log(error)
        }
        
    }
}

export function getTemperaments() {
    return async function(dispatch){
        const temperaments = await axios.get(TEMPERAMENTS_URL)
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments.data
            })
    }
}

export function orderAsc(payload) {
        return {
            type: SET_ORDER,
            payload: payload
        }
}

export function orderWeigth(payload) {
    return {
        type: SET_ORDER_WEIGTH,
        payload: payload
    }
}

export function orderDb(payload) {
    return {
        type: SET_ORDER_DB,
        payload: payload
    }
}

export function addDog(payload) {
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return async function(dispatch){
        
        let newDog = {
            name: capitalizarPrimeraLetra(payload.name),
            height: payload.heightMin + " - " + payload.heightMax,
            weight_min: payload.weightMin,
            weight_max: payload.weightMax,
            life_span: payload.life_span + " years",
            temperament: payload.temperament.join()
        }
        const res = await axios.post(DOGS_URL, newDog);
        return {
            type: ADD_DOG,
            payload: res
        }
    }
}
