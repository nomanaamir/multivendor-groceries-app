/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

// provider, store
import { Provider } from 'react-redux';
import store from './src/Store/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// shared pages
import ChooseOption from './src/shared/pages/choose-option/index';

// seller pages
import SellerSignUp from './src/sell-groceries/pages/sign-up/index';
import SellerSignIn from './src/sell-groceries/pages/sign-in/index';
import SellerDashboard from './src/sell-groceries/pages/seller-dashboard/index';
const Stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
function App() {



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="chooseOption" component={ChooseOption} options={{ headerShown: false, cardStyleInterpolator: forFade, }} />
          <Stack.Screen name="sellerSignUp" component={SellerSignUp} options={{
            headerTintColor: 'white', headerTitle: 'Sign Up', headerTitleAlign: 'center', headerStyle: {
              backgroundColor: '#687089',
              elevation: 0,
              shadowOpacity: 0,
            }, cardStyleInterpolator: forFade
          }} />
          <Stack.Screen name="sellerSignIn" component={SellerSignIn} options={{
            headerTintColor: 'white', headerTitle: 'Sign In', headerTitleAlign: 'center', headerStyle: {
              backgroundColor: '#687089',
              elevation: 0,
              shadowOpacity: 0,
            }, cardStyleInterpolator: forFade
          }} />
          <Stack.Screen name="sellerDashboard" component={SellerDashboard} options={{ headerShown: false, cardStyleInterpolator: forFade, }} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: 'red',
    flex: 1,
  }
});

export default App;
