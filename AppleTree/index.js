/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './screens/Main';
import Map from './screens/Map';
import AppleList from './screens/AppleList';
import MyPage from './screens/auth/MyPage';
import {name as appName} from './app.json';
import AppleDetail from './screens/AppleDetail';

AppRegistry.registerComponent(appName, () => App);
