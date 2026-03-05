import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mergedStack } from './ScreenCollections';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {mergedStack.map((screen, ind) => {
        return (
          <Stack.Screen
            key={ind}
            name={screen.name}
            component={screen.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default MainNavigator;
