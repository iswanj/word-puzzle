import React, {useState, useCallback} from 'react';
import {View, Text, LoaderScreen, Colors} from 'react-native-ui-lib';
import {useForm, Controller} from 'react-hook-form';

import {RootStackParamList} from '../../types';

import {useDispatch} from 'react-redux';
import {setUser} from '../../store/user';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {Input, Button} from '../../components';
import {EMAIL_PATTERN} from '../../constants';

import {signIn} from '../../api/users';
import {StackNavigationProp} from '@react-navigation/stack';

interface SignInProps {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

export const SignIn = ({navigation}: SignInProps) => {
  // const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log(email, password);
    try {
      setLoading(true);

      const res = await signIn({email, password});
      if (res.error) {
        setLoginError('Email or Password is incrorect, please try again.');
        return;
      }

      if (!res.error) {
        if (res.data) {
          dispatch(setUser(res.data));
        }
        navigation.replace('Home');
        setLoginError('');
      }
    } catch (error) {
      console.log('Sign in error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterLink = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <View flex useSafeArea>
      {loading && <LoaderScreen color={Colors.black} overlay />}
      <View flex marginT-20>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
          style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View marginT-20 center>
              <Text style={styles.title} text30M>
                Sign In
              </Text>
            </View>
            <View paddingT-10 centerH>
              <Text color={Colors.error}>{loginErr}</Text>
            </View>
            <View paddingT-30 paddingH-20>
              <View>
                <Controller
                  control={control}
                  render={meta => (
                    <Input
                      label="Email"
                      placeholder="Your email*"
                      error={errors?.email}
                      {...meta}
                    />
                  )}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: 'Email address is required',
                    },
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: 'Invalid email address',
                    },
                  }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={meta => (
                    <Input
                      label="Password"
                      placeholder="Your password*"
                      error={errors?.password}
                      secureTextEntry={true}
                      {...meta}
                    />
                  )}
                  name="password"
                  rules={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                  defaultValue=""
                />
              </View>
              <View>
                <Button label="Sign in" onPress={handleSubmit(onSubmit)} />
                <Button label="Register" onPress={handleRegisterLink} link />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.lightYellow,
    paddingVertical: Platform.OS === 'android' ? 20 : 0,
  },
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 16,
    bottom: 0,
  },
  link: {
    fontSize: 18,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  title: {
    color: Colors.black,
    textTransform: 'uppercase',
  },
  scrollView: {
    justifyContent: 'space-around',
  },
});
