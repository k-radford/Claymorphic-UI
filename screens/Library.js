import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import { colorKit } from "reanimated-color-picker";

import { popShadow } from "../styles";
import NavBar from "../components/navbar";

import { UserContext } from "../user/context";

const library = SQLite.openDatabase("db.Library");

const Library = ({ navigation }) => {
    const [folders, setFolders] = useState(null);
    const [cards, setCards] = useState(null);
    const {
        color, 
        setColor, 
        subscription, 
        setSubscription
    } = useContext(UserContext);

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            library.transaction((tx) => {              
                tx.executeSql("create table if not exists folders (id integer primary key not null, name text);", [], ((res) => console.log("FOLDERS: ",res)), ((err) => console.log("FOLDERS ERR: ", err)));
                tx.executeSql(
                    `select * from folders;`,
                    [],
                    (_, { rows: { _array } }) => {
                        console.log("Folders: ",_array);
                        setFolders(_array);
                    }
                );
                tx.executeSql("create table if not exists notes (id integer primary key not null, note text, folder integer not null, foreign key (folder) references folders (folder));", [], ((res) => console.log("NOTES: ",res)), ((err) => console.log("NOTES ERR: ", err)));
                tx.executeSql(
                    `select * from notes;`,
                    [],
                    (_, { rows: { _array } }) => {
                        console.log("Notes: ", _array);
                    }
                );
            });
          });
        return refresh;
    }, [navigation]);

    const highlight = colorKit.blend(color, 'white', 20).hex();
    const shadow = colorKit.blend(color, 'grey', 10).hex();
    const shadowText = colorKit.adjustContrast(color, '#fff', 6).hex();
    const darkMode = colorKit.darken(color, '90%').hex();

    const tabStyle = color == '#ffffff' ? 
        {...styles.folderTab, borderBottomColor: highlight} : 
        {...styles.folderTab, borderBottomColor: highlight, shadowColor: shadowText};

    const folderStyle = color == '#ffffff' ? 
        {...styles.folder} : 
        {   ...styles.folder, 
            backgroundColor: color, 
            borderTopColor: shadow, 
            borderBottomColor: shadow, 
            borderRightColor: shadow, 
            borderLeftColor: shadow,
            shadowColor: shadowText
        };

    return (
        <View style={{...styles.container, backgroundColor: color}}>
            <NavBar navigation={navigation}/>
            <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 25, color: shadowText, textTransform: 'uppercase'}}>folders</Text>
            <View style={styles.library}>
            <ScrollView style={{flex: 1}}>
            { folders === null || folders.length === 0 ? 
                null 
                :
                folders.map((f) => (
                    <TouchableOpacity
                        key={f.id} 
                        onPress={() =>  navigation.push('Folder', { folder: f, appColor: color })}
                    >
                        <View style={tabStyle}></View>
                        <View style={folderStyle}>
                            <Text style={{fontSize: 20, color: shadowText}}>{f.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
            <TouchableOpacity
                key={"new"}
                onPress={() => navigation.navigate('Add')}
            >
                <View style={tabStyle}></View>
                <View style={folderStyle}>
                    <Text style={{fontSize: 40, color: shadowText}}>+</Text>
                </View> 
            </TouchableOpacity>
            </View>
        </View> 
    );
};

export default Library;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight+10,
        paddingBottom: 30,
        backgroundColor: '#fff',
    },
    library: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    folder: {
        width: 300,
        height: 100,
        borderTopLeftRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 0,
        ...popShadow,
    },
    folderTab: {
        width: 100,
        height: 0,
        margin: 10,
        marginBottom: 0,
        ...popShadow,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 0,
        borderRightWidth: 40,
        borderBottomWidth: 15,
        borderLeftColor: "white",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 0,
        borderTopColor: "transparent"
    },

});
