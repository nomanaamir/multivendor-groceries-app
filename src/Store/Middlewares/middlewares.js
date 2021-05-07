import { ActionTypes } from '../Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
let redirect = {};
let database = firebase.database().ref();
let auth = firebase.auth();
async function storeData(data) {
    try {
        await AsyncStorage.setItem('store',
            JSON.stringify({
                'data': {
                    store: data,
                    isLoggedIn: true
                }
            })
        );
    } catch (error) {
        // Error saving data
        console.log('Cant store data in AsyncStorage: ', error)
    }
};

export const RetrieveDataAssyncStorage = () => async dispatch => {
    const response = await AsyncStorage.getItem('store');
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) })
        });

    }
}
export function ResetStoredData() {
    return dispatch => {

        dispatch({
            type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: {
                'data': {
                    store: {},
                    isLoggedIn: false
                }
            }
        })


    }
}
export function LogOut() {
    return dispatch => {
        auth.signOut().then(() => {
            AsyncStorage.clear().then(() => {
                dispatch(ResetStoredData())
                redirect.navigate('chooseOption');
            })
        })

    }
}


export function SellerAccountSignUp(email, password, seller) {
    return dispatch => {
        dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: true })
        auth.createUserWithEmailAndPassword(email, password).then((ev) => {
            dispatch(SetSellerStoreDetails(ev.user.uid, seller))
        }).catch(error => {
            dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: false })

            alert(error.message)
        })


    }
}


export function SetSellerStoreDetails(sellerUID, seller) {
    return dispatch => {
        database.child(`stores/${sellerUID}`).set(seller).then(() => {
            dispatch(GetSellerStoreDetails(sellerUID))
            dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: false })
        })

    }
}

export function GetSellerStoreDetails(sellerUID) {
    return dispatch => {
        database.child(`stores/${sellerUID}`).on('value', ev => {
            let sellerStore = ev.val();
            sellerStore = Object.assign({}, sellerStore, { uid: sellerUID });
            console.log('sellerStore', sellerStore)
            storeData(sellerStore);
            redirect.navigate('sellerDashboard')
        })


    }
}

export function setNavigationProps(navigation) {
    console.log('navigation:=>', navigation)
    return dispatch => {
        redirect = navigation;
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation })


    }
}