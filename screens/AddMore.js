import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import * as SQLite from "expo-sqlite";
import { screenContainer, screenHeight, sinkShadow, popShadow, colors, button } from "../styles";

const db = SQLite.openDatabase("db.Library");

const AddMore = ({ navigation, route }) => {

    const { folder } = route.params;
    const [note, setNotes] = useState(null);

    function formatNote() {
      const formatNotes = note.split("//");
      return formatNotes;
    }

    function addNotes() {
      console.log("addNotes: ", folder.name,  note);
      if (note != null) {
        const formatted = formatNote();
        console.log("formatted note: ", formatted);
        db.transaction(
          (tx) => {
            for (const note of formatted) {
              tx.executeSql("insert into notes (note, folder) values (?,?)", [note, folder.id], ((res) => {
                console.log("Notes response!: ", res);
              }), ((err) => {
                console.log("Notes error: ", err);
              }));
            }
            navigation.goBack();
          },
          (err) => {
            console.log("ERROR insert into notes (note, folder) values (?,?)");
          } 
        );
      }
      
    }

    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
            <View style={{
                height: screenHeight/2, 
                flexDirection: 'row'
            }}>
                <ScrollView style={{
                    ...sinkShadow,
                }}>
                    <TextInput 
                    placeholder={'End sentence with // to start new line'}
                    defaultValue={note != null ? note : null} 
                    onChangeText={(text) => {setNotes(text)}}
                    autoCapitalize={'sentences'}
                    returnKeyType="done" 
                    blurOnSubmit={true}
                    multiline={true}
                    style={{
                        flex: 1,
                        paddingTop: 15,
                        padding: 15,
                        height: 300, 
                    }}
                    />
                </ScrollView>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => addNotes()} style={{...styles.button, marginTop: 30}}><Text>Submit</Text></TouchableOpacity>
            </View>
        </View>  
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default AddMore;

const styles = StyleSheet.create({
    container: {
        ...screenContainer,
        minHeight: screenHeight
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    button: {
        flex: 1,
        ...popShadow,
        ...button,
    },
});
