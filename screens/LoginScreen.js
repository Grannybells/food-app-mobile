import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../services/config'
import { Feather } from '@expo/vector-icons';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
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
            <Text style={styles.buttonTextHeading} onPress={() => navigation.navigate("Register")}>Don't have an account? <Text style={styles.subheading}>SignUp here</Text></Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        alignSelf: 'center',
        fontSize: 50,
        fontWeight: '900',
        color: '#F18404',
        letterSpacing: 10,
    },
    inputContainer: {
        marginTop: 25,
        width: '80%',
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
        fontSize: 18,
    },
    buttonStart: {
        marginVertical: 20,
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
    },
    buttonTextHeading: {
        alignSelf: 'center',
        fontSize: 14,
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F18404',
    },
});
