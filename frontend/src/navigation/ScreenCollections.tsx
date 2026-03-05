import Login from '../screens/auth/Login';
import SplashScreen from '../screens/onboarding/SplashScreen';

export const authStack = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'LoginScreen',
    component: Login,
  },
];

export const dashboardStack = [];

export const mergedStack = [...authStack, ...dashboardStack];
