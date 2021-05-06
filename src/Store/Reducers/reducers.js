import { ActionTypes } from '../Actions/actions';

const InitialState = {
    signup_screen: '',
    navigation_props: {},
    async_storage_data: {},
   
}
let hello = []
export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_UP_INIT:
            return ({ ...state, signup_screen: action.payload });

    
        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload });

        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload })
       
        default:
            return state;
    }
}