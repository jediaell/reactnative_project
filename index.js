import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative';
import { Text, AppRegistry, LogBox } from 'react-native';
import AppContainer from './src';
import { name as appName } from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

LogBox.ignoreLogs([
  'Remote debugger is in a background',
  'Failed prop type',
  'Module RNRSA',
  'Module RNRSAKeychain',
]);

AppRegistry.registerComponent(appName, () => AppContainer);
