import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/Store/index';
const Stack = createStackNavigator();
// screens
import SignInScreen from './src/screens/sign-in/index'
import SignUpScreen from './src/screens/sign-up/index'
import ProfileScreen from './src/screens/profile/index'
import AuthCheckLoaderScreen from './src/screens/auth-check-loader/index'
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  useEffect(() => {

  }, []);
  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="authCheckLoaderScreen"
            component={AuthCheckLoaderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
}

const styles = StyleSheet.create({

});
