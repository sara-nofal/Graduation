/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Logo from '../../assets/images/Logo_1.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSigninButtons from '../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useForm, Controller } from 'react-hook-form';

const SigninScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSignedInPressed = async (data) => {
    console.log(data)
    //validate user
    try {
      const response = await fetch('http://10.0.2.2:4000/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if (!response.ok) {
        console.warn(json.error)
      }
      if (response.ok) {
        console.log('signned in', json)
        navigation.navigate('HomeScreen');
      }
    }
    catch (err) {
      console.log(err.message)
    }

  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          iconName="mail"
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: 'Email is required' }}
        />
        <CustomInput
          iconName="lock1"
          placeholder="Password"
          name="password"
          control={control}
          type="password"
          rules={{
            required: 'Password is required', minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long'
            }
          }}
        />
        <CustomButton text="Sign in" onPress={handleSubmit(onSignedInPressed)} />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"

        />
        <SocialSigninButtons />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SigninScreen;
