import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Platform } from 'react-native';
import { OAUTH } from './API';
import Toast from 'react-native-toast-message';
import { token_storage } from './storage';
import { setUser } from './reducers/userSlice';
import { resetAndNavigate } from '../utils/NavigationUtil';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const handleSignInError = (error: any) => {
  Toast.show({
    type: 'normalToast',
    props: {
      msg: 'We are facing some issues while signing you in. Please try again later.',
    },
  });
};

const handleSignInSuccess = async (res: any, dispatch: any) => {
  token_storage.set('app_access_token', res.data.tokens.access_token);
  token_storage.set('app_refresh_token', res.data.tokens.refresh_token);
  await dispatch(setUser(res.data.user));
  const { login_pin_exist, phone_exist, name } = res.data.user;
  if (!phone_exist) {
    resetAndNavigate('PhoneScreen');
  } else if (!name) {
    resetAndNavigate('PersonalDetailScreen');
  } else if (!login_pin_exist) {
    resetAndNavigate('PinScreen');
  } else {
    resetAndNavigate('AuthVericationScreen');
  }
};

export const signInWithAppleAndroid = async (dispatch: any) => {
  try {
    const rawNonce = uuid();
    const state = uuid();
    appleAuthAndroid.configure({
      clientId: '',
      redirectUri: 'https://auth.tradingmadesimple.com/callback',
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state,
    });
    const response = await appleAuthAndroid.signIn();
    const res = await axios.post(OAUTH, {
      provider: 'apple',
      id_token: response.id_token,
    });
    await handleSignInSuccess(res, dispatch);
  } catch (error) {
    handleSignInError(error);
  }
};

export const signInWithAppleIos = async (dispatch: any) => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const appleResponse = appleAuthRequestResponse;
      const res = await axios.post(OAUTH, {
        provider: 'apple',
        id_token: appleResponse.identityToken,
      });
      await handleSignInSuccess(res, dispatch);
    } else {
      throw new Error('There was an error');
    }
  } catch (error) {
    handleSignInError(error);
  }
};

export const signInWithApple = async (dispatch: any) => {
  if (Platform.OS === 'ios') {
    await dispatch(signInWithAppleIos(dispatch));
  } else {
    await dispatch(signInWithAppleAndroid(dispatch));
  }
};

export const signInWithGoogle = () => async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();

    const { idToken } = (await GoogleSignin.signIn()) as any;
    const res = await axios.post(OAUTH, {
      provider: 'google',
      id_token: idToken,
    });
    await handleSignInSuccess(res, dispatch);
  } catch (error) {
    handleSignInError(error);
  }
};
