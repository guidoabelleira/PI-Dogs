import {GET_DOGS, GET_DOGS_BY_NAME, SET_ORDER} from '../actions/actionsTypes';


const initialState = {
    dogs: [],
    temperament: [],
    setOrderAsc: false,
    // setOrderDesc: false
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