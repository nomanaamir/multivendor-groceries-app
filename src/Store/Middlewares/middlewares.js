import { ActionTypes } from '../Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
let redirect = {};
let database = firebase.database().ref();
async function storeData(data) {
    try {
        await AsyncStorage.setItem('user',
            JSON.stringify({
                'data': {
                    user: data,
                    isLoggedIn: true
                }
            })
        );
    } catch (error) {
        // Error saving data
        console.log('Cant store data in AsyncStorage: ', error)
    }
};

export const retrieveDataAssyncStorage = () => async dispatch => {
    const response = await AsyncStorage.getItem('user');
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) })
        });

    }
}
export function resetStoredData() {
    return dispatch => {

        dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: {} })


    }
}
export function logOut() {
    return dispatch => {
        AsyncStorage.clear().then(() => {

            redirect.navigate('welcome');
        })

    }
}


export function SignUpTestFunction(isOpen) {
    return dispatch => {
        database.child('test').push({ name: 'noman' })
        dispatch({ type: ActionTypes.SIGN_UP_INIT, payload: isOpen })


    }
}

export function setNavigationProps(navigation) {
    console.log('navigation:=>', navigation)
    return dispatch => {
        redirect = navigation;
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation })


    }
}