import React, {useState, useCallback} from 'react';
import {View, Text, LoaderScreen, Colors} from 'react-native-ui-lib';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {Input, Button} from '../../components';
import {EMAIL_PATTERN} from '../../constants';

export const SignIn: React.FC = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
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
    navigate('Home');
    console.log(email, password);
    // try {
    //   setLoading(true);

    //   const res = await signIn({email, password});
    //   if (res.error) {
    //     console.log(
    //       'error: ',
    //       res.message || 'Email or Password is incrorect, please try again.',
    //     );
    //   }
    //   navigation.replace('Bootstrap');
    // } catch (error) {
    //   console.log('Sign in error: ', error);
    // }
  };

  const handleRegisterLink = useCallback(() => {
    navigate('Register');
  }, [navigate]);

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
            <View paddingT-40 paddingH-20>
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
