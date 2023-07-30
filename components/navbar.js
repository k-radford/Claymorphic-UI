import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colorKit } from "reanimated-color-picker";

import { UserContext } from "../user/context";

const NavBar = ({ navigation }) => {

    const {
        color, 
    } = useContext(UserContext);

    const shadowText = colorKit.adjustContrast(color, '#fff', 4.5).hex();

    return (
        <SafeAreaView style={{...styles.container, backgroundColor: color}}>
        <View style={styles.row}>
            <Feather.Button onPress={() => { navigation.navigate('Account'); }} name={'settings'} size={30} color={shadowText} backgroundColor={color} borderRadius={30} iconStyle={{marginRight:0}} />
        </View>
        </SafeAreaView>
    );
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,        
    }
});
