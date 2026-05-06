import React from 'react';
import { TextStyle, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import { RFPercentage } from 'react-native-responsive-fontsize';

const TouchableText: React.FC<{
  firstText: string;
  style?: TextStyle;
  onPress?: () => void;
}> = ({ firstText, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.bottomText, { color: Colors.active_tab }, style]}>
        {firstText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: FONTS.Medium,
    fontSize: RFPercentage(1.6),
    textDecorationLine: 'underline',
  },
});

export default TouchableText;
