import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import React from "react";

const FavoriteScreen = () => {
    return (
        <View style={styles.container}>
            <Text>FavoriteScreen</Text>
        </View>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
