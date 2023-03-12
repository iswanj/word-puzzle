import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native-ui-lib';

import {Provider} from 'react-redux';
import store from './src/store';

import Screens from './src/screens';

Colors.loadColors({
  error: '#ff2442',
  success: '#00CD8B',
  white: '#ffffff',
  offWhite: '#CCC',
  text: '#1A1C19',
  black: '#1A1C19',
  grey: '#888888',
});

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Screens />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
