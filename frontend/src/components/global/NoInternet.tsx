import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
import { FONTS } from '../../constants/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NoInternet = () => {
  const { colors } = useTheme();
  const [isConnected, setIsConnected] = React.useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!isConnected && (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: Colors.background,
            },
          ]}
        >
          <View
            style={[
              styles.subContainer,
              {
                backgroundColor: Colors.sub_background,
              },
            ]}
          >
            <Icon name="wifi-off" size={RFValue(20)} color={colors.text} />
            <CustomText variant="h7" style={styles.bottomText}>
              Low Internet
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={FONTS.Medium}
              style={styles.bottomText}
            >
              Check your network connection
            </CustomText>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    width: '100%',
  },
  bottomText: {
    opacity: 0.87,
    marginTop: 4,
  },
});

export default NoInternet;
