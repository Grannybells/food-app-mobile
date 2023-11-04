import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native"; // Import components from React Native
import React, { useState, useEffect } from "react"; // Import React and necessary hooks

import { useRoute } from '@react-navigation/native'; // Import the useRoute hook from React Navigation
import { firebase } from '../services/config'; // Import Firebase configuration
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation

import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons
import { Entypo } from '@expo/vector-icons'; // Import icons from Expo vector icons

const SaveDetails = () => {
    // Initialize navigation
    const navigation = useNavigation()

    // Get the route and extract the 'recipe' parameter from the route
    const route = useRoute();
    const { recipe } = route.params;

    // Get the current user from Firebase authentication
    const currentUser = firebase.auth().currentUser;

    // Initialize a state variable to track whether the recipe is saved by the user
    const [isSaved, setIsSaved] = useState(false);

    // Check if the recipe is saved by the current user and set 'isSaved' accordingly
    useEffect(() => {
        if (currentUser) {
            // Get a reference to the user's document
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Get a reference to the recipe document within the user's 'savedRecipes'
            const recipeRef = doc(userRef, 'savedRecipes', recipe.id);

            // Check if the recipe exists in the user's saved recipes
            getDoc(recipeRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setIsSaved(true);
                    }
                })
                .catch((error) => {
                    console.error('Error checking saved recipe:', error);
                });
        }
    }, [currentUser, recipe]);

    // Function to remove the recipe from the user's saved recipes
    const removeSavedRecipe = () => {
        if (currentUser) {
            // Get a reference to the user's document
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Get a reference to the recipe document within the user's 'savedRecipes'
            const recipeRef = doc(userRef, 'savedRecipes', recipe.id);

            // Delete the recipe document from the user's saved recipes
            deleteDoc(recipeRef)
                .then(() => {
                    setIsSaved(false);
                    navigation.goBack();
                    console.log('Recipe removed from saved recipes.');
                })
                .catch((error) => {
                    console.error('Error removing saved recipe:', error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={{ uri: recipe.data.imageUrl }} resizeMode="cover" />
            <ScrollView style={styles.body}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.headerText}>{recipe.data.food_name}</Text>
                    <View style={styles.subContainer}>
                        <MaterialIcons name="category" size={20} color="black" />
                        <Text style={styles.sectionText}>
                            {recipe.data.category}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.sectionText}>
                            {recipe.data.meal}
                        </Text>
                        <View style={styles.divider} />
                        <Entypo name="time-slot" size={20} color="black" />
                        <Text style={styles.sectionText}>
                            {recipe.data.time_cook}
                        </Text>
                    </View>
                    <Text style={styles.subHeaderText}>Description</Text>
                    <Text style={styles.subText}>{recipe.data.description}</Text>
                    <Text style={styles.subHeaderText}>Direction to cook</Text>
                    <Text style={styles.subText}>{recipe.data.direction}</Text>
                    <Text style={styles.subHeaderText}>Ingredients</Text>
                    <Text style={styles.subText}>{recipe.data.ingredient}</Text>
                    {isSaved ? (
                        <TouchableOpacity style={styles.buttonContainer} onPress={removeSavedRecipe}>
                            <Text style={styles.buttonText}>Remove from Saved Recipes</Text>
                        </TouchableOpacity>
                    ) : null
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default SaveDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: '35%',
        borderWidth: 2,
        width: '100%',
    },
    divider: {
        backgroundColor: 'black',
        width: 1.5,
        height: 25,
    },
    body: {
        width: '100%',
        padding: 20,
    },
    bodyContainer: {
        paddingHorizontal: 10, // Added to control container width
        gap: 10,
        alignItems: 'center',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    sectionText: {
        fontSize: 18,
    },
    headerText: {
        fontSize: 35, // Adjusted font size
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 20,
    },
    subText: {
        width: '100%',
        fontSize: 15,
        textAlign: 'justify',
    },
    buttonContainer: {
        flexDirection: 'row', // Fixed typo in flexDirection
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 100,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F18404',
    },
});