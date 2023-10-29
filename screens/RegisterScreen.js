import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../services/config'
import { Feather } from '@expo/vector-icons';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    registerUser = async (email, password, firstname, lastname) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'https://food-app-2146c.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent!')
                    }).catch((error) => {
                        alert(error.message)
                    })
                    .then(() => {
                        firebase.firestore().collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                firstName,
                                lastName,
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.messsage)
                    })
            })
            .catch((error => {
                alert(error.message)
            }))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>SIGN UP</Text>
            <View style={styles.inputContainer}>
                <Feather name="user" size={30} color="black" />
                <TextInput
                    placeholder='First Name'
                    style={styles.input}
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="user" size={30} color="black" />
                <TextInput
                    placeholder='Last Name'
                    style={styles.input}
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="mail" size={30} color="black" />
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={30} color="black" />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                />
            </View>

            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.buttonStart}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextHeading} onPress={() => navigation.navigate("Login")}>Already a user? <Text style={styles.subheading}>Login here</Text></Text>
        </View>
    );
};

export default RegisterScreen;

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
