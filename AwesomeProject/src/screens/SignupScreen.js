/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSigninButtons from '../components/SocialSigninButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

const EMAIL_REGEX = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const SignupScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    // console.log(data)
    try {
      const response = await fetch('http://10.0.2.2:4000/api/users', {
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
        console.log('new user added', json)
        navigation.navigate('ConfirmEmail');
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  }

  const onTermsOfUsePressed = () => {
    console.warn('Terms');
  }

  const onPrivacyPressed = () => {
    console.warn('Privacy');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          iconName="user"
          name="firstname"
          placeholder="Firstname"
          control={control}
          rules={{ required: 'Firstname is required' }}
        />
        <CustomInput
          iconName="user"
          name="lastname"
          placeholder="Lastname"
          control={control}
          rules={{ required: 'Lastname is required' }}
        />
        <CustomInput
          iconName="mail"
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' }
          }}
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
        <CustomInput
          iconName="lock1"
          placeholder="Repeat Password"
          name="password-repeat"
          control={control}
          type="password"
          rules={{
            validate: value =>
              value === pwd || 'Password do not match',
          }}
        />
        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use{' '}
          </Text>
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            {' '}
            Privacy Policy
          </Text>{' '}
        </Text>
        <SocialSigninButtons />
        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignupScreen;
