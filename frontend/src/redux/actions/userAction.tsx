import { resetAndNavigate } from '../../utils/NavigationUtil';
import { appAxios } from '../apiConfig';
import { setUser } from '../reducers/userSlice';

export const CheckProfile = async (dispatch: any) => {
  try {
    const res = await appAxios.get('/auth/profile');
    const { userId, email, login_pin_exist, phone_exist, name } = res.data;
    await dispatch(setUser(res.data));

    if (!phone_exist) {
      resetAndNavigate('PhoneScreen');
    } else if (!name) {
      resetAndNavigate('PersonalDetailScreen');
    } else if (!login_pin_exist) {
      resetAndNavigate('PinScreen');
    } else {
      resetAndNavigate('AuthVerificationScreen');
    }
  } catch (error) {
    console.log('PROFILE ->', error);
  }
};
