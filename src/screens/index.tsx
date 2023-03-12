import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from '../features/signin';
import {Register} from '../features/register';
import {Home} from '../features/puzzle';
import {CategorySelect} from '../features/puzzle/CategorySelect';
import {PuzzleGame} from '../features/puzzle/PuzzleGame';
import {LeaderBoard} from '../features/leader-board';
import {Bootstrap} from './Bootstrap';

import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bootstrap"
      screenOptions={{gestureEnabled: true, headerShown: false}}>
      <Stack.Screen name="Bootstrap" component={Bootstrap} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
      <Stack.Screen name="CategorySelect" component={CategorySelect} />
      <Stack.Screen name="PuzzleGame" component={PuzzleGame} />
    </Stack.Navigator>
  );
};

export default Screens;
