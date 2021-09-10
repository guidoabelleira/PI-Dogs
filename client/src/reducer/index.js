import {GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID, GET_TEMPERAMENTS, ADD_DOG, SET_ORDER} from '../actions/actionsTypes';


const initialState = {
    dogs: [],
    temperaments: [],
    setOrderAsc: false,
    // setOrderDesc: false
    byId: []
}

function reducer(state = initialState, action){
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGS_BY_NAME: 
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGS_BY_ID: 
            return {
                ...state,
                byId: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case SET_ORDER:
            let desc;
            if(action.payload === true){
                desc = state.dogs.sort(function (a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
            } else {
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
        // case SET_ORDER_DESC:
        //     if(action.payload === true){
        //         var desc = state.dogs.sort(function (a, b){
        //             if(a.name > b.name){
        //                 return -1;
        //             }
        //             if(b.name > a.name){
        //                 return 1;
        //             }
        //             return 0;
        //         })
        //     }
        //     return {
        //         ...state,
        //         dogs: desc
        //     }
        default: return state;
    }
}

export default reducer;