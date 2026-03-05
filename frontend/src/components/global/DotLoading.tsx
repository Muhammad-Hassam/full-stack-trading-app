import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@react-navigation/native';

const DotLoading = () => {
  const { colors } = useTheme();
  const [animatedValue] = useState(
    Array.from({ length: 4 }, () => new Animated.Value(1)),
  );

  useEffect(() => {
    startAnimation();
    return () => resetAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValue.map(value =>
          Animated.sequence([
            Animated.timing(value, {
              toValue: 0.5,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 1,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    ).start();
  };

  const resetAnimation = () => {
    animatedValue.forEach(value => value.setValue(1));
  };
  return (
    <View style={styles.container}>
      {animatedValue.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: colors.text,
              marginRight: index !== 3 ? 10 : 0,
              transform: [{ scaleY: value }],
              opacity: value,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: RFValue(18),
    height: RFValue(18),
    borderRadius: 10,
  },
});

export default DotLoading;
