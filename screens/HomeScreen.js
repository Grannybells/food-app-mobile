import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from '@react-navigation/native';

import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../services/config";

import { Entypo } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';


const HomeScreen = () => {

    const navigation = useNavigation();

    const foodCategory = [
        { id: 1, title: 'All' },
        { id: 2, title: 'Meat' },
        { id: 3, title: 'Vegetables' },
        { id: 4, title: 'Fish' },
        { id: 5, title: 'Dairy' },
        { id: 6, title: 'Healthy' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [foodrecipe, setFoodrecipe] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const foodCollection = collection(db, 'food_recipe');
                const querySnapshot = await getDocs(foodCollection);

                const initialData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setFoodrecipe(initialData);

                const unsubscribe = onSnapshot(foodCollection, (querySnapshot) => {
                    const updatedData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));
                    setFoodrecipe(updatedData);
                });
                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRecipes();
    }, []);

    const filterRecipesByCategory = () => {
        return foodrecipe.filter((recipe) => {
            const categoryMatch =
                selectedCategory === 'All' || recipe.data.category === selectedCategory;
            const nameMatch = recipe.data.food_name.toLowerCase().includes(searchText.toLowerCase()); // Check name match

            return categoryMatch && nameMatch;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input} >
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput placeholder="Search Recipe" value={searchText} onChangeText={(text) => setSearchText(text)} />
                </View>
                <Text style={styles.sectionText}>Category</Text>
                <ScrollView style={styles.categoryContainer} horizontal={true}>
                    {foodCategory.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => setSelectedCategory(category.title)}
                            style={styles.categoryButtons}
                        >
                            <Text >
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView style={styles.body}>
                <Text style={styles.sectionText}>Recipe</Text>
                <View style={styles.bodyContainer}>
                    {filterRecipesByCategory().map((recipe) => (
                        <TouchableOpacity key={recipe.id} style={styles.itemContainer} onPress={() => navigation.navigate('Recipe Detail', { recipe })}>
                            <View style={styles.foodImage}>
                                <Image style={styles.foodImage} source={{ uri: recipe.data.imageUrl }} resizeMode="cover" />
                            </View>
                            <Text style={styles.headerText}>{recipe.data.food_name}</Text>
                            <View style={styles.details}>
                                <Entypo name="time-slot" size={20} color="black" />
                                <Text style={styles.subText}>{recipe.data.time_cook}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.itemContainerShadow} />

                    <View style={styles.whiteSpace} />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },

    header: {
        paddingTop: '5%',
        paddingHorizontal: '5%',
        height: '20%',
        gap: 10,
    },

    body: {
        padding: '5%',
    },

    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    categoryContainer: {
        flexDirection: 'row',
        gap: 10
    },

    sectionText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    categoryButtons: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        height: 40,
        width: 80,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bodyContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },

    itemContainer: {
        flexDirection: 'column',
        width: '45%',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F18404',
        padding: 20,
        borderRadius: 20,
        gap: 10,
    },

    itemContainerShadow: {
        width: '45%',
        height: 250,
    },

    foodImage: {
        borderWidth: 2,
        borderRadius: 30,
        width: 120,
        height: 120,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    whiteSpace: {
        marginBottom: 150,
    }
});
