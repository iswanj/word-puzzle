import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {User} from '../types';

interface SignInResponse {
  error: boolean;
  message?: string;
  data?: User;
}

interface SignInParams {
  email: string;
  password: string;
}

interface SignOutResponse {
  error: boolean;
  message?: string;
}

export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<SignInResponse> => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const id = res.user.uid;
    const user = await firestore().collection('users').doc(id).get();
    return {
      error: false,
      data: {
        id,
        email: res.user.email,
        fullName: user.get('fullName'),
        score: user.get('score'),
      },
    };
  } catch (error: any) {
    console.log('error--login--', error);
    return {error: true, message: error.message};
  }
};

export const signOut = async (): Promise<SignOutResponse> => {
  try {
    await auth().signOut();
    return {error: false};
  } catch (error: any) {
    console.log('signout error: ', error);
    return {error: true, message: error.message};
  }
};

export const getUser = async (id: string): Promise<User | undefined> => {
  try {
    const user = await firestore().collection('users').doc(id).get();
    const data = {
      id: user.data()?.id,
      email: user.data()?.email,
      fullName: user.data()?.fullName,
      score: user.data()?.score,
    };
    return data as unknown as User;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await firestore()
      .collection('users')
      .orderBy('score', 'desc')
      .get();
    let userData: User[] = [];
    users.forEach(item => {
      userData.push({
        id: item.id,
        email: item.data()?.email,
        fullName: item.data()?.fullName,
        score: item.data()?.score,
      });
    });
    return userData;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateScore = async (
  id: string,
  score: number,
): Promise<User | undefined> => {
  try {
    const userRef = firestore().collection('users');
    const userObj = await userRef.doc(id).get();
    const userData = userObj.data();

    await firestore()
      .collection('users')
      .doc(id)
      .update({
        score: userData?.score + score,
      });
  } catch (error) {
    console.log('error update fcm token: ', error);
    return Promise.reject(error);
  }
};

export default getUser;
