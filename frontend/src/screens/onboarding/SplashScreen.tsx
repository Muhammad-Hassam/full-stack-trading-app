import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import DotLoading from '../../components/global/DotLoading';
import { useAppDispatch } from '../../redux/reduxHook';
import { token_storage } from '../../redux/storage';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-toast-message';
import { resfresh_tokens } from '../../redux/apiConfig';
import { CheckProfile } from '../../redux/actions/userAction';

interface DecodedToken {
  exp: number;
}

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  const tokenCheck = async () => {
    const app_access_token = token_storage.getString(
      'app_access_token',
    ) as string;
    const app_refresh_token = token_storage.getString(
      'app_refresh_token',
    ) as string;

    if (app_access_token) {
      const decodedAccessToken = jwtDecode<DecodedToken>(app_access_token);
      const decoddedRefreshToken = jwtDecode<DecodedToken>(app_refresh_token);

      const currentTime = Date.now() / 1000;

      if (decoddedRefreshToken?.exp < currentTime) {
        resetAndNavigate('LoginScreen');
        Toast.show({
          type: 'warningToast',
          props: { msg: 'Session expired. Please log in again.' },
        });
        return;
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          resfresh_tokens('app', true);
          await dispatch(CheckProfile);
        } catch (error) {
          Toast.show({
            type: 'warningToast',
            props: { msg: 'Session expired. Please log in again.' },
          });
        }
      } else {
        await dispatch(CheckProfile);
      }
      return;
    }
    resetAndNavigate('LoginScreen');
  };

  useEffect(() => {
    async function deepLinks() {
      await tokenCheck();
    }
    const timerId = setTimeout(deepLinks, 1000);
    return () => clearTimeout(timerId);
    deepLinks();
  });

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <DotLoading />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
