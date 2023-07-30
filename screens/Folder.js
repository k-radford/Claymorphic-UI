import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, Entypo, MaterialIcons, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

import { colorKit } from "reanimated-color-picker";
import { popShadow, button, colors, screenContainer, sinkShadow } from "../styles";

import { UserContext } from "../user/context";
const db = SQLite.openDatabase("db.Library");

const Folder = ({ navigation, route }) => {

    const { folder } = route.params;
    const [ notes, setNotes ] = useState(null);
    const {color} = useContext(UserContext);

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            db.transaction((tx) => {
                tx.executeSql(
                    `select * from notes where folder = (?);`,
                    [folder.id],
                    (_, { rows: { _array } }) => {
                        console.log(_array);
                        setNotes(_array);
                    }
                );
            });
          });
        return refresh;
    }, [navigation]);


    function deleteFolder() {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from folders where id = (?)", [folder.id], ((res) => {

                }));
                tx.executeSql("delete from notes where folder = (?)", [folder.id], ((res) => {
                    console.log(res);
                    navigation.goBack();
                }));
            },
            (err) => {console.log("err: ", err);},
            (succ) => {console.log("succ: ", succ);}
        );
    }

    const deleteAlert = () => {
        Alert.alert(
            `Delete Folder?`,
            ``,
            [{
                text: "Cancel",
                onPress: () => {
                    return
                },
                style: "cancel",
            },
            {
                text: "Confirm",
                onPress: () => {
                    deleteFolder();
                }
            }]
        );
    }

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
        <View style={styles.header}>
            {/* <Text style={{fontSize: 20, color: shadowText}}>{notes ? notes.length : null} {notes?.length == 1 ? 'Note' : 'Notes'}</Text> */}
            <Ionicons.Button onPress={() => {navigation.push('AddMore', { folder: folder })}} name={'add'} color={shadowText} size={40} backgroundColor={color} borderRadius={30} iconStyle={{marginRight:0}}/>
            <Ionicons.Button onPress={() => {deleteAlert()}} name={'trash'} color={shadowText} size={30} backgroundColor={color} borderRadius={30} iconStyle={{marginRight:0}}/>
        </View>
        <Text></Text>
        <View style={styles.page}>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <ScrollView style={{...styles.scrollView, shadowColor: shadowText, borderColor: color}}>
            { notes != null ?
            notes.map((c, index, arr) => (
                <Text key={index} style={{marginVertical: 4}}>{c.note}</Text>
            ))
            : null }
            </ScrollView>
        </View>
        </View>
        </View>
    );
};

export default Folder;

const styles = StyleSheet.create({
    container: {
        ...screenContainer,
        paddingTop: 20
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        //width: 300,
        //margin: 10
    },
    scrollView: {
        margin: 5,
        padding: 15,
        ...sinkShadow
        // borderWidth: 3,
        // borderColor: '#ffffff',
        // borderRadius: 30,
        // shadowColor: colors.grey,
        // shadowRadius: 5,
        // shadowOpacity: 1,
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // }
    },
    button: {
        //width: 300,
        flex: 1,
        height: 125,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 20,
        ...popShadow
    }   
});
