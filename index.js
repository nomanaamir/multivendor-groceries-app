/**
 * @format
 */

import {AppRegistry} from 'react-native';
import firebaseConfig from './src/firebase/config';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
