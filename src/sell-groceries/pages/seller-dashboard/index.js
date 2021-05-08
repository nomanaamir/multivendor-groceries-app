/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
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
// import 'connect' to connect the redux with screens
import { connect } from 'react-redux';
// import middlewares functions
import { RetrieveDataAssyncStorage, LogOut } from '../../../Store/Middlewares/middlewares';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from '../dashboard/index';
import AddNewProduct from '../add-new-product/index'
const Stack = createStackNavigator();

// fade animation between routing
const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

function SellerDashboard(props) {

    useEffect(() => {
        props.RetrieveDataAssyncStorageAction() // calling get seller's store function of asynncStorage
    }, []);

    return (
        <Stack.Navigator>

            {/* navigation screens routes of seller dashboard */}
            <Stack.Screen name="dashboard" component={Dashboard} options={{
                headerRightContainerStyle: {
                    padding: 10
                },
                headerLeft: () => null,
                headerRight: () => (
                    <Button
                        onPress={() => props.LogOutAction()}
                        title="log out"
                        color="#FF4500"
                    />
                ),
                headerTintColor: 'white', headerTitle: props.sellerStore?.storeName, headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />

            <Stack.Screen name="addNewProduct" component={AddNewProduct} options={{

                headerTintColor: 'white', headerTitle: props.sellerStore?.storeName, headerTitleAlign: 'left', headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: 0,
                    shadowOpacity: 0,
                }, cardStyleInterpolator: forFade
            }} />


        </Stack.Navigator>
    );
};


function mapStateToProps(state) {
    console.log('Redux State - Seller Dashboard Screen', state.root.async_storage_data?.data?.store)
    return {
        sellerStore: state.root.async_storage_data?.data?.store
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()) },
        LogOutAction: () => { dispatch(LogOut()) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerDashboard);
