import Login from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/onboarding/SplashScreen';
import EmailScreen from '../screens/auth/EmailScreen';
import PhoneScreen from '../screens/auth/PhoneScreen';
import AuthVerification from '../screens/auth/AuthVerification';
import StockScreen from '../screens/stock/StockScreen';

export const authStack = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'LoginScreen',
    component: Login,
  },
  {
    name: 'EmailScreen',
    component: EmailScreen,
  },
  {
    name: 'PhoneScreen',
    component: PhoneScreen,
  },
  {
    name: 'AuthVerificationScreen',
    component: AuthVerification,
  },
];

export const dashboardStack = [
  {
    name: 'StockScreen',
    component: StockScreen,
  },
];

export const mergedStack = [...authStack, ...dashboardStack];
