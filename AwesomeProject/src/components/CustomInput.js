import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Controller } from 'react-hook-form';
const CustomInput = ({ iconName, control, name, placeholder, type, rules = {} }) => {
  const [isSecureEntry, setIsSecureEntry] = type ? useState(true) : useState(false);
  const [isPass, setIsPass] = useState(0);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            <AntDesign
              name={iconName}
              size={30}
              color={'#3B71F3'}
              style={styles.icon}
            />
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={isSecureEntry}
            />
            <TouchableOpacity style={styles.eye} onPress={() => { setIsSecureEntry(prev => !prev); }}>
              {
                type === "password" ? <Entypo name={isSecureEntry ? 'eye-with-line' : 'eye'} size={30} color={'#3B71F3'} /> : null
              }
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRaduis: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  input: {},
  icon: {
    top: 10,
    marginRight: 10,
  },
  eye: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
export default CustomInput;
