import {View, Text} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

const SocialSigninButtons = () => {
  const onSignedInFacebook = () => {
    console.warn('Facebook');
  };
  const onSignedInGoogle = () => {
    console.warn('Google');
  };
  const onSignedInApple = () => {
    console.warn('Apple');
  };
  return (
    <>
      <CustomButton
        text="Sign in with Facebook"
        onPress={onSignedInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765a9"
      />
      <CustomButton
        text="Sign in with Google"
        onPress={onSignedInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign in Apple"
        onPress={onSignedInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSigninButtons;
