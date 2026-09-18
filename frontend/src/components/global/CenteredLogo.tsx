import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.png';

const CenteredLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={Logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  imgContainer: {
    width: RFValue(140),
    height: RFValue(40),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default CenteredLogo;
