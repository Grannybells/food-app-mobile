import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useNavigation } from '@react-navigation/native';
import welcome from '../assets/images/welcome.png'

const WelcomeScreen = () => {

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

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight
    },
    imgContainer: {
        flex: 4.5,
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 2
    },
    textContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '80%',
    },
    heading: {
        fontSize: 35,
        fontWeight: '900',
        textAlign: 'left',
    },
    subheading: {
        color: 'black',
        fontSize: 15,
    },
    primaryColor: {
        color: '#F18404',
    },
    buttonStart: {
        marginTop: 20,
        backgroundColor: '#F18404',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        borderRadius: 30,
        elevation: 5,
        padding: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    }
});
