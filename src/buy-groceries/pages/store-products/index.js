/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import ProductsList from '../products-list/index';
import ProductDetails from '../product-details/index';
import PaymentDetails from '../payment-details/index';
import Congrats from '../congrats/index';
const Stack = createStackNavigator();

// fade animation between routing
const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

function StoreProducts(props) {
    const { route } = props;
    const { store } = route.params.params;
    let selectedStore = JSON.parse(store);
    const { storeName } = selectedStore;
    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="productsList" component={ProductsList} options={{

                headerTintColor: 'white', headerTitle: storeName, headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />

            <Stack.Screen name="productDetails" component={ProductDetails} options={{

                headerTintColor: 'white', headerTitle: 'Ecommerce', headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />

            <Stack.Screen name="paymentDetails" component={PaymentDetails} options={{

                headerTintColor: 'white', headerTitle: 'Payment Method', headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }
            }} />

            <Stack.Screen name="congrats" component={Congrats} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
};


export default StoreProducts;
