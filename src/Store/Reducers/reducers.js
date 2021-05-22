import { ActionTypes } from '../Actions/actions';

const InitialState = {
    is_seller_signed_up: false,
    is_seller_signed_in: false,
    is_admin_signed_in: false,
    navigation_props: {},
    current_seller_products: {},
    stores_list: {},
    async_storage_data: {
        'data': {
            store: {},
            isLoggedIn: false
        }
    }

}

export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.SELLER_SIGN_UP_SUCCESS:
            return ({ ...state, is_seller_signed_up: action.payload }); // save seller sign up boolean in reducer state

        case ActionTypes.SELLER_SIGN_IN_SUCCESS:
            return ({ ...state, is_seller_signed_in: action.payload }); // save seller sign in boolean in reducer state

        case ActionTypes.ADMIN_SIGN_IN_SUCCESS:
            return ({ ...state, is_admin_signed_in: action.payload }); // save admin sign in boolean in reducer state


        case ActionTypes.GET_CURRENT_SELLER_PRODUCTS:
            return ({ ...state, current_seller_products: action.payload }); // save current seller products in reducer state

        case ActionTypes.GET_STORES: // filtering stores UID and saving in object with other store details
            let obj = {};
            let storesArray = []
            for (let key in action.payload.stores) {
                if (action.payload.stores.hasOwnProperty(key)) {
                    obj = Object.assign({}, action.payload.stores[key], { uid: key })
                    storesArray.push(obj)
                }
            }
            return ({ ...state, stores_list: { stores: storesArray, loading: action.payload.loading } });



        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload }); // save navigation props in reducer state

        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload }) // save asyncstorage data in reducer state

        default:
            return state;
    }
}