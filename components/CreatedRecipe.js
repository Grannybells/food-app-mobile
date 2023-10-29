import React from "react";

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../services/config";
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const CreatedRecipe = () => {

    const route = useRoute();
    const { recipe } = route.params;

    const navigation = useNavigation()

    const handleDeleteRecipe = async () => {
        try {
            // Delete the recipe document from Firestore by its ID
            await deleteDoc(doc(db, 'food_recipe', recipe.id));
            console.log(`Recipe with ID ${recipe.id} deleted successfully.`);
            // Navigate back to the previous screen or a different screen
            navigation.goBack(); // Adjust this as needed
        } catch (error) {
            console.error('Error deleting recipe:', error);
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
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteRecipe}>
                        <Text style={styles.subHeaderText}>Delete</Text>
                    </TouchableOpacity>
                    <View style={styles.whiteSpace} />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreatedRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: '30%',
        borderWidth: 2,
        width: '100%',
    },
    divider: {
        borderWidth: 1,
        height: 25,
    },
    body: {
        width: '100%',
        padding: 20,
    },
    bodyContainer: {
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
        fontSize: 40,
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
        lexDirection: 'row',
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
});
