import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { db, firebase } from '../services/config';
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
} from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const AddScreen = () => {
    const navigation = useNavigation();

    const time = [
        { key: '1', value: '15 Minutes' },
        { key: '2', value: '30 Minutes' },
        { key: '3', value: '1 Hour' },
        { key: '4', value: '1 Hour 15 Minutes' },
        { key: '5', value: '1 Hour 30 Minutes' },
        { key: '6', value: '2 Hours' },
        { key: '7', value: '2 Hours 15 Minutes' },
        { key: '8', value: '2 Hours 30 Minutes' },
        { key: '9', value: '3 Hours' },
    ];

    const categories = [
        { key: '1', value: 'Meat' },
        { key: '2', value: 'Fruits' },
        { key: '3', value: 'Vegetables' },
        { key: '4', value: 'Fish' },
        { key: '5', value: 'Dairy' },
    ];

    const [food_name, setFood_name] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [direction, setDirection] = useState('');
    const [time_cook, setTime_cook] = useState('');

    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const addRecipe = async () => {

        if (!food_name || !category || !description || !ingredient || !direction || !time_cook || !imageUri) {
            alert('Please fill in all the required fields and select an image for the recipe.');
            return;
        }

        try {
            if (!imageUri) {
                alert('Please select an image for the recipe.');
                return;
            }

            const newDocRef = collection(db, 'food_recipe');

            const storage = getStorage();
            const imageFileName = new Date().getTime() + '.jpg';
            const storageRef = ref(storage, 'images/' + imageFileName);

            const response = await fetch(imageUri);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);

            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(newDocRef, {
                published: firebase.auth().currentUser.uid,
                food_name,
                category,
                description,
                ingredient,
                direction,
                time_cook,
                date: serverTimestamp(),
                imageUrl,
            });

            alert('Recipe Added!');
            navigation.navigate('Create');
        } catch (error) {
            console.error('Error recipe: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.imageContainer} />
                )}

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputButton} onPress={pickImage}>
                        <Ionicons name="images-outline" size={20} color={'#F18404'} />
                        <Text style={styles.imageText}>Add Recipe Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Recipe Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        placeholder="Recipe Name"
                        onChangeText={(food_name) => setFood_name(food_name)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.inputHeight]}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        autoCorrect={false}
                        onChangeText={(description) => setDescription(description)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>category</Text>
                    <SelectList
                        boxStyles={{
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#F18404',
                            paddingHorizontal: 8,
                        }}
                        inputStyles={{ fontSize: 15 }}
                        setSelected={(val) => setCategory(val)}
                        data={categories}
                        save="value"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Ingredient</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        multiline
                        placeholder="Ingredients"
                        onChangeText={(ingredient) => setIngredient(ingredient)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Direction</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        multiline
                        placeholder="Direction"
                        onChangeText={(direction) => setDirection(direction)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Time to cook</Text>
                    <SelectList
                        boxStyles={{
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#F18404',
                            paddingHorizontal: 8,
                        }}
                        inputStyles={{ fontSize: 15 }}
                        setSelected={(val) => setTime_cook(val)}
                        data={time}
                        save="value"
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={addRecipe}
                >
                    <Text style={styles.buttonText}>Save Recipe</Text>
                </TouchableOpacity>
                <View style={styles.whiteSpace} />
            </ScrollView>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        width: '100%',
        padding: 20,
    },

    imageContainer: {
        borderRadius: 15,
        width: '100%',
        height: '25%'
    },
    imageText: {
        color: '#F18404',
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    inputText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        width: '100%',
        padding: 10,
        fontSize: 16,
    },

    inputButton: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        width: '100%',
        padding: 10,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
    },
    inputHeight: {
        textAlignVertical: 'top',
    },
    buttonContainer: {
        backgroundColor: '#F18404',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 100,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    whiteSpace: {
        marginBottom: 250,
    }
});
