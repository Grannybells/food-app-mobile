import React, { useState } from "react"; // Import React and useState hook
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput } from "react-native"; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { firebase } from '../services/config'; // Import Firebase configuration

import { Feather } from '@expo/vector-icons'; // Import icons from Expo vector icons


const Login = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // State variable to store the credentials
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Function to log in the user with email and password
    const loginUser = async (email, password) => {
        try {
            // Attempt to sign in with the provided email and password
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            // Display an alert with the error message
            alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>LOGIN</Text>
            <View style={styles.inputContainer}>
                <Feather name="mail" size={30} color="black" />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={30} color="black" />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity style={styles.buttonStart} onPress={() => loginUser(email, password)}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextHeading} onPress={() => navigation.navigate("Register")}>Don't have an account? <Text style={styles.subheading}>Sign Up here</Text></Text>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, /* Added padding for better mobile layout */
        marginTop: StatusBar.currentHeight,
    },
    heading: {
        fontSize: 35, /* Adjusted font size for better mobile readability */
        fontWeight: '700', /* Adjusted font weight */
        color: '#F18404',
        letterSpacing: 5, /* Adjusted letter spacing */
        textAlign: 'center', /* Centered text */
    },
    inputContainer: {
        marginTop: 20, /* Reduced margin for better mobile spacing */
        width: '90%', /* Increased width for better mobile layout */
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#EAEAEA",
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    input: {
        fontSize: 16, /* Adjusted font size for better mobile readability */
    },
    buttonStart: {
        marginVertical: 20,
        backgroundColor: '#F18404',
        paddingHorizontal: 20, /* Adjusted padding for better mobile layout */
        paddingVertical: 10, /* Adjusted padding for better mobile layout */
        borderRadius: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18, /* Adjusted font size for better mobile readability */
        fontWeight: 'bold',
    },
    buttonTextHeading: {
        alignSelf: 'center',
        fontSize: 14,
    },
    subheading: {
        fontSize: 18, /* Adjusted font size for better mobile readability */
        fontWeight: '700', /* Adjusted font weight */
        color: '#F18404',
    },
});

