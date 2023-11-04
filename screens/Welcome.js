import React from "react"; // Import React
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from "react-native"; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

import welcome from '../assets/images/welcome.png'; // Import the 'welcome' image from the assets

const Welcome = () => {
    // Initialize navigation
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Image style={styles.imgContainer} source={welcome} resizeMode="cover" />
            <View style={styles.buttonContainer}>
                <Text style={styles.textContainer}>
                    <Text style={styles.heading}>Meet<Text style={styles.primaryColor}> Meal Planner</Text>{'\n'}Savor. <Text style={styles.primaryColor}>Repeat.</Text></Text>
                    <Text style={styles.subheading}>{'\n'}Fueling Your Wellness Journey, One Meal at a Time!</Text>
                </Text>
                <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Welcome</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight,
    },
    imgContainer: {
        flex: 4.5,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 2,
        width: '100%',
    },
    textContainer: {
        width: '80%',
        maxWidth: 400, /* Added maximum width for responsiveness */
        alignItems: 'center', /* Center the content horizontally */
    },
    heading: {
        fontSize: 28, /* Adjusted font size for better mobile readability */
        fontWeight: '700', /* Adjusted font weight */
        textAlign: 'center', /* Center the text */
    },
    subheading: {
        color: 'black',
        fontSize: 14, /* Adjusted font size for better mobile readability */
        textAlign: 'center', /* Center the text */
    },
    primaryColor: {
        color: '#F18404',
    },
    buttonStart: {
        marginTop: 20,
        backgroundColor: '#F18404',
        paddingHorizontal: 20, /* Adjusted padding for better mobile layout */
        paddingVertical: 10, /* Adjusted padding for better mobile layout */
        borderRadius: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

