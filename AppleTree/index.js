/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './screens/Main';
import Map from './screens/Map';
import AppleList from './screens/AppleList';
import MyPage from './screens/auth/MyPage';
import RecordVoice from './screens/RecordVoice';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
