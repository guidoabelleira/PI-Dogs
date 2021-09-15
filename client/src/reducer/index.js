import {GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, GET_TEMPERAMENTS, ADD_DOG, SET_ORDER, SET_ORDER_WEIGTH, SET_ORDER_DB} from '../actions/actionsTypes';


const initialState = {
    dogs: [],
    back: [],
    temperaments: [],
    perritoId: []
}

function reducer(state = initialState, action){
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                back: action.payload
            }
        case GET_DOGS_BY_NAME: 
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGS_BY_ID: 
            return {
                ...state,
                perritoId: [action.payload]
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case SET_ORDER:
            let desc = [];
            if(action.payload === 'up'){
                desc = state.dogs.sort(function (a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
            } else if(action.payload === 'down') {
                desc = state.dogs.sort(function (a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            }
        
            return {
                ...state,
                dogs: desc
            }
        case ADD_DOG:
            return {
                ...state
            }
        case SET_ORDER_WEIGTH:
            let byWeight = [];
            if(action.payload === 'up'){
                byWeight = state.dogs.sort(function (a, b){
                    return a.weight_min - b.weight_min;
                })
            } else if(action.payload === 'down'){
                byWeight = state.dogs.sort(function (a, b){
                    return b.weight_min - a.weight_min
                    ;
                })
            } else if(action.payload === 'none'){
                byWeight = state.dogs.sort(function (a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                dogs: byWeight
            }
        case SET_ORDER_DB:
            let all = state.back;
            let byDb = [];
            if(action.payload === 'all'){
                byDb = all;
            } else if(action.payload === 'api') {
                byDb = all.filter(d => d.id <= 270 )
            } else if(action.payload === 'mydogs') {
                byDb = all.filter(d => d.id.length >= 4)
            }
            return {
                ...state,
                dogs: byDb
            }
        default: return state;
    }
}

export default reducer;