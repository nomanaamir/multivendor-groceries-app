/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    useColorScheme,
    View,
    Button
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from '../dashboard/index';
import AddNewProduct from '../add-new-product/index'
const Stack = createStackNavigator();
const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});
function SellerDashboard() {



    return (
        <Stack.Navigator>

            {/* navigation screens route */}
            <Stack.Screen name="dashboard" component={Dashboard} options={{
                headerRightContainerStyle: {
                    padding: 10
                },
                headerLeft: () => null,
                headerRight: () => (
                    <Button

                        onPress={() => null}
                        title="log out"
                        color="#FF4500"
                    />
                ),
                headerTintColor: 'white', headerTitle: 'XYZ STORE', headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />

            <Stack.Screen name="addNewProduct" component={AddNewProduct} options={{

                headerTintColor: 'white', headerTitle: 'XYZ STORE', headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />
            {/* <Stack.Screen name="chooseOption" component={ChooseOption} options={{ headerShown: false, cardStyleInterpolator: forFade, }} /> */}


        </Stack.Navigator>
    );
};



export default SellerDashboard;
