import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { goBack, navigate } from '../../utils/NavigationUtil';

interface BackButtonProps {
  path?: string;
}

const BackButton: FC<BackButtonProps> = ({ path }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        path ? navigate(path) : goBack();
      }}
    >
      <Icon name="arrow-back" size={RFValue(20)} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 4,
    marginBottom: 8,
  },
});

export default BackButton;
