import React, { JSX } from 'react';
import { View, Text, TextStyle, TextInput, StyleSheet } from 'react-native';

interface InputProps {
  label?: string;
  iconName?: string;
  error?: string;
  leftIcon: JSX.Element;
  rightIcon: JSX.Element;
  rightText?: JSX.Element;
  disabled?: JSX.Element;
  disabledBackground?: boolean;
  password?: boolean;
  textType?: boolean;
  containerStyle: TextStyle;
  required?: boolean;
  textInputStyle?: TextStyle;
  onFocus?: () => void;
}

const CustomInput: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({
  label,
  iconName,
  error,
  leftIcon,
  rightIcon,
  rightText,
  disabled,
  disabledBackground,
  password,
  textType,
  containerStyle,
  required,
  textInputStyle,
  onFocus = () => {},
  ...props
}) => {
  return <View style={styles}></View>;
};

const styles = StyleSheet.create({});

export default CustomInput;
