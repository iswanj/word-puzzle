import React, {useEffect} from 'react';
import {View, LoaderScreen, Colors} from 'react-native-ui-lib';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';

import {useDispatch} from 'react-redux';
import {setUser} from '../store/user';
import {RootStackParamList} from '../types';
import {getUser} from '../api/users';

interface BootstrapProps {
  navigation: StackNavigationProp<RootStackParamList, 'Bootstrap'>;
}

export const Bootstrap = ({navigation}: BootstrapProps) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async (userData: any) => {
    console.log('called onAuthStateChanged');
    if (userData === null) {
      navigation.replace('SignIn');
    } else {
      try {
        const profile = await getUser(userData.uid);
        if (profile) {
          dispatch(setUser(profile));
          if (navigation.isFocused()) {
            // check if the screen is currently focused
            navigation.replace('Home');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View flex center>
      <LoaderScreen message={'Loading...'} color={Colors.grey40} />
    </View>
  );
};
