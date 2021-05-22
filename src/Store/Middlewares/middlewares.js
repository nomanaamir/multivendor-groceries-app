import { ActionTypes } from '../Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
let redirect = {}; // declare navigation object
let database = firebase.database().ref(); // declare firebase database query function
let auth = firebase.auth(); // declare firebase auth query function

// asyncstorage function for saving logged in user info
async function storeData(data, admin) {
    try {
        await AsyncStorage.setItem('store',
            JSON.stringify({
                'data': {
                    store: data, // seller details
                    isLoggedIn: true, // user logged in boolean
                    isAdmin: admin // admin logged in boolean
                }
            })
        );
    } catch (error) {
        // Error saving data
        console.log('Cant store data in AsyncStorage: ', error)
    }
};

// get data from asyncstorage
export const RetrieveDataAssyncStorage = () => async dispatch => {
    const response = await AsyncStorage.getItem('store');
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) }) // pass data to reducer
        });

    }
}

// reset function of asyncstorage save data in reducer
export function ResetStoredData() {
    return dispatch => {

        dispatch({
            type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: {
                'data': {
                    store: {},
                    isLoggedIn: false,
                    isAdmin: false

                }
            }
        })


    }
}

// firebase logout funtion
export function LogOut() {
    return dispatch => {
        auth.signOut().then(() => { // logout the user from firebase
            AsyncStorage.clear().then(() => { //remove seller details from asyncstorage
                dispatch(ResetStoredData()) // call reset function of asyncstorage's save data in reducer
                redirect.navigate('chooseOption'); // after logout completely redirect the user to 'choose option' screen
            })
        })

    }
}

// seller sign up function
export function SellerAccountSignUp(email, password, seller) {
    return dispatch => {
        dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: true }) // loading true
        auth.createUserWithEmailAndPassword(email, password).then((ev) => { // create user in firebase
            dispatch(SetSellerStoreDetails(ev.user.uid, seller)) // calling "save seller info in database" funtion - passing seller UID and details
            dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: false }) // loading false after successfully sign Up
        }).catch(error => {
            dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: false }) // loading false

            alert(error.message) // show error message
        })


    }
}

// seller sign in function 
export function SellerAccountSignIn(email, password) {
    return dispatch => {
        dispatch({ type: ActionTypes.SELLER_SIGN_IN_SUCCESS, payload: true }) // loading true
        auth.signInWithEmailAndPassword(email, password).then((ev) => { // sign in user from firebase
            dispatch(GetSellerStoreDetails(ev.user.uid)) // calling get store details from firebase function
            dispatch({ type: ActionTypes.SELLER_SIGN_IN_SUCCESS, payload: false }) // loading false
        }).catch(error => {
            dispatch({ type: ActionTypes.SELLER_SIGN_IN_SUCCESS, payload: false })// loading false

            alert(error.message) // show alert msg
        })


    }
}

// save seller details in firebase function
export function SetSellerStoreDetails(sellerUID, seller) {
    return dispatch => {
        database.child(`stores/${sellerUID}`).set(seller).then(() => { // save seller store details in firebase
            dispatch(GetSellerStoreDetails(sellerUID)) // then calling get function of store details from firebase - passing seller UID
            dispatch({ type: ActionTypes.SELLER_SIGN_UP_SUCCESS, payload: false }) // loading false
        })

    }
}

// add new product function in firebase database
export function SellerAddNewProduct(sellerUID, product) {
    return dispatch => {
        database.child(`stores/${sellerUID}/products`).push(product).then(() => { // add product in database under sellerUID > products node
            redirect.navigate('dashboard') // then redirected to dashboard

        })

    }
}

// admin sign in function
export function AdminAccountSignIn() {
    return dispatch => {
        dispatch({ type: ActionTypes.ADMIN_SIGN_IN_SUCCESS, payload: true }) //loading true
        setTimeout(() => {
            storeData({}, true); // save admin boolean in asynsctorage
            redirect.navigate('adminDashboard') //then redirected to admin dashboard
            dispatch({ type: ActionTypes.ADMIN_SIGN_IN_SUCCESS, payload: false }) // loading false
        }, 1000);


    }
}

// get current seller products function
export function GetCurrentSellerProducts(sellerUID) {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_CURRENT_SELLER_PRODUCTS, payload: { products: {}, loading: true } }) // loading true
        database.child(`stores/${sellerUID}/products`).on('value', (ev) => { // fetch current seller products list
            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_CURRENT_SELLER_PRODUCTS, payload: { products: ev.val(), loading: false } }) // loading false and save data to reducer
            } else {
                dispatch({ type: ActionTypes.GET_CURRENT_SELLER_PRODUCTS, payload: { products: {}, loading: false } }) // loading false

            }
        })

    }
}

// get seller store details function
export function GetSellerStoreDetails(sellerUID) {
    return dispatch => {
        database.child(`stores/${sellerUID}`).on('value', ev => { // get logged in seller details
            if (!ev.val()) {
                auth.currentUser ? auth.currentUser.delete().then(() => { // if seller details is deleted by admin then delete seller registeration
                    auth.signOut().then(() => {
                        AsyncStorage.clear().then(() => { // clear details from asynsctorage
                            dispatch(ResetStoredData()) // reset data from reducers
                            alert('Your account has been deleted by Admin!') // show alert
                        })
                    })
                }) : null
            } else { // otherwise save user details
                let sellerStore = ev.val();
                sellerStore = Object.assign({}, sellerStore, { uid: sellerUID });
                storeData(sellerStore, false); // calling asynsctorage function of save seller details data
                redirect.navigate('sellerDashboard') // then redirect to seller dashboard
            }
        })


    }
}

// delete seller
export function DeleteSeller(sellerUID) {
    return dispatch => {
        database.child(`stores/${sellerUID}`).remove().then(() => {
            alert('Seller Successfully Deleted!')
        })


    }
}

// get all stores function
export function GetStores() {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_STORES, payload: { stores: {}, loading: true } }) // loading true
        database.child(`stores`).on('value', (ev) => { // fetch all stores from firebase
            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_STORES, payload: { stores: ev.val(), loading: false } }) // save stores to reducers and loading false
            } else {
                dispatch({ type: ActionTypes.GET_STORES, payload: { stores: {}, loading: false } }) // loading false

            }
        })


    }
}

// navigation props save function
export function setNavigationProps(navigation) {
    return dispatch => {
        redirect = navigation; // save props to 'redirect' object to navigate between screens here
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation }) // save props in reducers in order to access it from anywhere


    }
}