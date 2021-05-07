import { ActionTypes } from '../Actions/actions';

const InitialState = {
    is_seller_signed_up: false,
    is_seller_signed_in: false,
    navigation_props: {},
    async_storage_data: {
        'data': {
            store: {},
            isLoggedIn: false
        }
    }

}
let hello = []
export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.SELLER_SIGN_UP_SUCCESS:
            return ({ ...state, is_seller_signed_up: action.payload });

        case ActionTypes.SELLER_SIGN_IN_SUCCESS:
            return ({ ...state, is_seller_signed_in: action.payload });

        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload });

        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload })

        default:
            return state;
    }
}