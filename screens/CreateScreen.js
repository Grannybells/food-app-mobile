import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import { db, firebase } from "../services/config";

const CreateScreen = () => {

    const navigation = useNavigation()

    const [foodrecipe, setFoodrecipe] = useState([]);

    useEffect(() => {
        const user = firebase.auth().currentUser;

        if (user) {
            const userUid = user.uid;
            const foodCollection = collection(db, 'food_recipe');
            const userQuery = query(foodCollection, where('published', '==', userUid));

            const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
                const updatedData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setFoodrecipe(updatedData);
            });

            return () => {
                // Unsubscribe from the snapshot listener when the component unmounts
                unsubscribe();
            };
        }
    }, []);

    return (
        <View style={styles.container}>
            {/* Add button recipe */}
            <View style={styles.upperLayer}>
                <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Add Recipe")}>
                    <Ionicons name="ios-add-circle" size={35} color={'#F18404'} />
                    <Text style={styles.buttonText}>Add Recipe?</Text>
                </TouchableOpacity>
            </View>

            {/* Render created recipe */}
            <View style={styles.bottomLayer}>
                <ScrollView style={styles.body}>
                    {foodrecipe.map((recipe) => (
                        <TouchableOpacity style={styles.buttonContainer} key={recipe.id} onPress={() => navigation.navigate('Created Recipe', { recipe })}>
                            <Text>{recipe.data.food_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperLayer: {
        flex: 1,
        width: '100%',
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomLayer: {
        flex: 8,
        width: '100%',
    },
    buttonStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
        gap: 10,
    },
    buttonText: {
        color: '#F18404',
        fontSize: 25,
        fontWeight: 'bold',
    },
    body: {
        paddingHorizontal: '5%',
    },
    buttonContainer: {
        lexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
    },

});
