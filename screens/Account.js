import React, { useState, useEffect, useContext } from "react";
import { Alert, TouchableOpacity, StyleSheet, View, Text, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import ColorPicker, { Swatches, colorKit } from 'reanimated-color-picker';
import Constants from "expo-constants";
import { nativeApplicationVersion } from 'expo-application';

import { popShadow, textInput, screenContainer, button, colors, customSwatches, voices, screenHeight } from "../styles";

import PrivacyPolicy from "../components/privacy";
import Terms from "../components/terms";

import { UserContext } from "../user/context";
const db = SQLite.openDatabase("db.Library");

const Account = ({ navigation }) => {
    const [account, setAccount] = useState(null);

    const {
        color: defaultColor, 
        setColor, 
        subscription, 
        setSubscription,
    } = useContext(UserContext);

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const onSelectColor = ({ hex }) => {
        // do something with the selected color.
        console.log("New Global Color: ", hex);
        setColor(hex);
    };


    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            db.transaction((tx) => {
                //tx.executeSql("create table if not exists account (id integer primary key not null, name text);");
                //tx.executeSql("create table if not exists cards (id integer primary key not null, question text, answer text, folder integer foreign key references folders(folder));");
                tx.executeSql(
                    `select * from account;`,
                    [],
                    (_, { rows: { _array } }) => {
                        console.log(_array);
                        setAccount(_array);
                    }
                );
            });
          });
        return refresh;
    }, [navigation]);

    function deleteNotes() {
        db.transaction((tx) => {
            tx.executeSql(
                `delete from folders;`, 
                [],
                (_, { rows: { _array } }) => {
                    console.log(_array);
                }
            );
            tx.executeSql(
                `delete from notes;`, 
                [],
                (_, { rows: { _array } }) => {
                    console.log(_array);
                }
            );
        });
    }

    const deleteAlert = () => {
        Alert.alert(
            `Delete ALL Notes`,
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
                    deleteNotes();
                }
            }]
        );
    }

    const highlight = colorKit.blend(defaultColor, 'white', 20).hex();
    const shadow = colorKit.blend(defaultColor, 'grey', 10).hex();
    const shadowText = colorKit.adjustContrast(defaultColor, '#fff', 4.5).hex();
    const darkMode = colorKit.darken(defaultColor, '90%').hex();

    return (
        <View style={{...styles.container}}>
            <View style={styles.settings}>
                <View style={styles.setting}>
                    <Text style={styles.settingLabels}>Account:    </Text>
                        <TouchableOpacity
                            style={styles.button}
                            disabled
                        >
                            <Text style={{color: defaultColor.grey, fontSize: styles.settingLabels.fontSize}}>{subscription ? "Premium" : "Free"}</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.setting}>
                    <Text style={styles.settingLabels}>Color Scheme:   </Text>
                        <TouchableOpacity
                            style={{...styles.button, backgroundColor: defaultColor}}
                            onPress={() => setShowColorPicker(true)}
                        />
                </View>
            
            </View>

            <View style={{flexDirection: 'row', marginTop: 40}}>
                <TouchableOpacity onPress={() => deleteAlert()} style={styles.button}>
                    <Ionicons name={'trash'} color='#FF8888' size={30} backgroundColor="white" borderRadius={30} iconStyle={{marginRight:0}}/>
                </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center'}}>
                <Text onPress={() => setShowPrivacyPolicy(true)} style={{textDecorationLine: 'underline'}}>Privacy Policy</Text>
                <Text onPress={() => setShowTerms(true)} style={{textDecorationLine: 'underline', marginTop: 10}}>Terms & Conditions</Text>
                <Text style={{marginTop: 10}}>Version: {nativeApplicationVersion}</Text>
            </View>

            <Modal visible={showColorPicker} animationType='slide'>
                <View style={{...styles.modal, backgroundColor: defaultColor}}>
                    <View >
                    <ColorPicker style={{ width: '100%' }} value={defaultColor} onComplete={onSelectColor}>
                        {/* <Preview hideText={true}/> */}
                        {/* <Panel1 /> <HueSlider /> <OpacitySlider /> <Swatches /> */}
                        <Swatches swatchStyle={styles.swatchStyle} colors={customSwatches} style={{backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 20, borderRadius: 30}}/>
                    </ColorPicker>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 0}}>
                        <TouchableOpacity onPress={() => setShowColorPicker(false)} style={{
                            ...styles.button, 
                            backgroundColor: defaultColor, 
                            borderTopColor: shadow, 
                            borderBottomColor: shadow, 
                            borderRightColor: shadow, 
                            borderLeftColor: shadow,
                            shadowColor: shadowText
                            }}>
                            <Text style={{color: shadowText, fontSize: 20}}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showPrivacyPolicy} animationType='slide'>
                <View style={{...styles.modal, justifyContent: 'space-between', paddingBottom: 30}}>
                    <PrivacyPolicy/>
                    <View style={{flexDirection: 'row', marginTop: 40, width: 300}}>
                        <TouchableOpacity onPress={() => setShowPrivacyPolicy(false)} style={{...styles.button}}>
                            <Text style={{color: defaultColor.grey}}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showTerms} animationType='slide'>
                <View style={{...styles.modal, justifyContent: 'space-between', paddingBottom: 30}}>
                    <Terms/>
                    <View style={{flexDirection: 'row', marginTop: 40, width: 300}}>
                        <TouchableOpacity onPress={() => setShowTerms(false)} style={{...styles.button}}>
                            <Text style={{color: defaultColor.grey}}>close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        ...screenContainer,
        justifyContent: 'space-between'
    },
    modal: {
        flex: 1,
        padding: 40,
        paddingTop: Constants.statusBarHeight*2,
        paddingBottom: Constants.statusBarHeight*2.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    settings: {
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    setting: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
        ...popShadow,
        ...button,
    },
    settingLabels: {
        fontSize: 18
    },
    swatchStyle: {
        borderRadius: 20,
        height: 40,
        width: 40,
        marginHorizontal: 10,
        marginBottom: 25,
    }
});
