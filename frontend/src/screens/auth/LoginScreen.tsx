import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { useAppDispatch } from '../../redux/reduxHook';
import Logo from '../../assets/images/logo.png';
import GoogleIcon from '../../assets/images/google.png';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import SocialLoginButton from '../../components/auth/SocialLoginButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { signInWithApple, signInWithGoogle } from '../../redux/SocialLogin';
import TouchableText from '../../components/auth/TouchableText';
import { navigate } from '../../utils/NavigationUtil';

const Login = () => {
  const dispatch = useAppDispatch();
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={Logo} />
        </View>
        <CustomText variant="h1" fontFamily={FONTS.Medium}>
          Trading Made Simple
        </CustomText>
        <CustomText variant="h7" style={styles.subText} fontFamily={FONTS.Bold}>
          Trading . Invest . Success
        </CustomText>
        <SocialLoginButton
          icon={<Image source={GoogleIcon} style={styles.gimg} />}
          text="Continue with Google"
          onPress={async () => await dispatch(signInWithGoogle())}
        />
        <SocialLoginButton
          icon={<Icon name="logo-apple" size={18} color="#fff" />}
          text="Continue with Apple"
          onPress={async () => await signInWithApple(dispatch)}
        />
        <TouchableText
          firstText="Sign in with email ID"
          onPress={() => navigate('EmailScreen')}
          style={styles.touchText}
        />
      </View>
      <CustomText variant="h9" fontFamily={FONTS.Medium} style={styles.text}>
        Made By 💖 UA - Digital
      </CustomText>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchText: {
    marginVertical: 30,
    marginTop: 15,
  },
  text: {
    opacity: 0.6,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  gimg: {
    height: 20,
    width: 20,
  },
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    marginTop: 10,
    opacity: 0.6,
    marginBottom: 16,
  },
  imgContainer: {
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default Login;
