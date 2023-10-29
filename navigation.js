import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import About from "./screens/AboutScreen";
import SettingScreen from "./screens/SettingScreen";
import AddScreen from "./screens/AddScreen";
import CreateScreen from "./screens/CreateScreen";
import RecipeDetails from "./screens/RecipeDetails";
import CreatedRecipe from "./screens/CreatedRecipe";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Add Recipe" component={AddScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
            <Stack.Screen name="Created Recipe" component={CreatedRecipe} />
        </Stack.Navigator>
    );
};
