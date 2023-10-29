import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import { firebase } from "../services/config";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setName(snapshot.data());
                } else {
                    console.log("User does not exist");
                }
            });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.topLayer} />
            <View style={styles.bottomLayer} >

            </View>
            <View style={styles.profileContainer}>
                <View style={{ height: 100, width: 100, borderColor: '#F18404', borderWidth: 4, borderRadius: 100, alignItems: 'center', justifyContent: 'center', }} >
                    <AntDesign name="user" size={50} color="gray" />
                </View>
                <Text style={styles.profileName}>
                    {name.firstName} {name.lastName}
                </Text>
                <Text style={styles.emailName}>{name.email}</Text>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Setting")}
                    ><AntDesign name="setting" size={24} color="white" />
                        <Text style={styles.buttonText}> Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => firebase.auth().signOut()} style={styles.buttonStart}
                    ><MaterialIcons name="logout" size={24} color="white" />
                        <Text style={styles.buttonText}> Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        // backgroundColor: 'white',
        // alignItems: 'center',
    },
    topLayer: {
        backgroundColor: '#F18404',
        flex: 1
    },
    bottomLayer: {
        flex: 3,
        backgroundColor: 'white',
    },
    profileContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 30,
        borderColor: '#F18404',
        elevation: 20,
        height: '30%',
        width: '85%',
        top: '5%',
        gap: -5,
    },
    profileName: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 25,
    },
    emailName: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonStart: {
        marginTop: 10,
        backgroundColor: '#F18404',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        borderRadius: 10,
        elevation: 5,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});
