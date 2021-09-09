import axios from 'axios';
import { DOGS_URL, TEMPERAMENTS_URL } from '../constantes';
import { GET_DOGS, GET_DOGS_BY_NAME, GET_TEMPERAMENTS, SET_ORDER } from "./actionsTypes";


export function getDogs() {
    return async function(dispatch) {
        const dogs = await axios.get(DOGS_URL);
            dispatch({
                type: GET_DOGS,
                payload: dogs.data
            })   
    };
};
// ver actualizacion stado filtro 
export function getDogByName(name) {
    return async function(dispatch){
        const dogsByName = await axios.get(DOGS_URL + '?name=' + name)
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogsByName.data
            }) 
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

export function orderAsc(value) {
    return {
        type: SET_ORDER,
        payload: value
    }
}

