import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from './services/config';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Tabs from './tabs';

import SettingScreen from './components/SettingScreen';
import AddScreen from './components/AddScreen';
import RecipeDetails from './components/RecipeDetails';
import CreatedRecipe from './components/CreatedRecipe';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // handle user state changes 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      <Stack.Screen name="Add Recipe" component={AddScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Recipe Detail" component={RecipeDetails} />
      <Stack.Screen name="Created Recipe" component={CreatedRecipe} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
