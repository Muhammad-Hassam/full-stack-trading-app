import React from 'react';
import { ScrollView } from 'react-native';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import BackButton from '../../components/global/BackButton';
import CenteredLogo from '../../components/global/CenteredLogo';
import CustomInput from '../../components/inputs/CustomInput';

function EmailScreen() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  return (
    <CustomSafeAreaView>
      <BackButton path="LoginScreen" />
      <ScrollView>
        <CenteredLogo />
        <CustomInput
          label="Email Address"
          returnKeyType="done"
          value={email}
          inputMode="email"
          focusable
          autoFocus
          error={emailError}
          onEndEditing={() => {
            validate();
          }}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          placeholder="Eg: me@gmail.com"
          onSubmitEditing={handleOnSubmit}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
}

export default EmailScreen;
