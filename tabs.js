import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FavoriteScreen from "./screens/FavoriteScreen";

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreateScreen from "./screens/CreateScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            lazyLoad: true,
            tabBarStyle: [{
                position: 'absolute',
                height: 80,
                paddingHorizontal: 20,
                alignItems: "center",
                justifyContent: "center",
            },]
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome name="home" size={40} color={focused ? '#F18404' : '#CBCBCB'} />)
            }} />

            <Tab.Screen name="Create" component={CreateScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="ios-add-circle" size={35} color={focused ? '#F18404' : '#CBCBCB'} />)
            }} />

            <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome name="heart" size={30} color={focused ? '#F18404' : '#CBCBCB'} />)
            }} />

            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome5 name="user-alt" size={30} color={focused ? '#F18404' : '#CBCBCB'} />)
            }} />
        </Tab.Navigator>
    );
};