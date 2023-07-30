import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import * as SQLite from "expo-sqlite";

import { button, popShadow, colors, sinkShadow, screenContainer, screenHeight } from "../styles";

const db = SQLite.openDatabase("db.Library");

const Add = ({ navigation }) => {

    const [name, setName] = useState(null);
    const [note, setNote] = useState(null);
    const [folderId, setFolderId] = useState(null);

    const isFirstRender = useRef(true);

    // addNotes() once we have folder id
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return; // 👈️ return early if initial render
      }
      addNotes();
    }, [folderId]);

    function formatNote() {
      const formatNotes = note.split("//");
      return formatNotes;
    }

    function addFolder() {
      console.log("addFolder: ", name,  note);
      if (name == null) {
        Alert.alert(`Empty Input`, `\nName your Folder!`);
        return;
      }
      db.transaction(
        (tx) => {
          // add folder to folders
          tx.executeSql("insert into folders (name) values (?)", [name], ((res) => {
            console.log("Folder response!: ", res);
          }), ((res) => {
            console.log("Folder ERR!: ", res);
          }));
          tx.executeSql("select last_insert_rowid() as id;", [], 
            (_, { rows: { _array } }) => {
              console.log("Folder id: ",_array[0].id);
              setFolderId(_array[0].id);
          });
        }
      );
      
    }

    function addNotes() {
      console.log("addNotes: ", name,  note);
      if (note != null) {
        const formatted = formatNote();
        console.log("formatted note: ", formatted);
        db.transaction(
          (tx) => {
            for (const note of formatted) {
              tx.executeSql("insert into notes (note, folder) values (?,?)", [note, folderId], ((res) => {
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
            <Text style={styles.stepHeader}>Name:</Text>
            <View style={{flexDirection: 'row'}}>
              <ScrollView scrollEnabled={false} style={{...sinkShadow}}>
              <TextInput 
                placeholder={'Folder Name'} 
                onChangeText={(text) => {setName(text)}}
                autoCapitalize={'words'}
                returnKeyType="done" 
                style={{padding: 15, flex: 1, height: 50}}
              />
              </ScrollView>
            </View>
            <Text></Text>
            <Text style={styles.stepHeader}>Notes:</Text>
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
                    onChangeText={(text) => {setNote(text)}}
                    autoCapitalize={'sentences'}
                    returnKeyType='done' 
                    multiline={true}
                    blurOnSubmit={true}
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
              <TouchableOpacity onPress={() => addFolder()} style={{...styles.button, marginTop: 30}}><Text>Submit</Text></TouchableOpacity>
            </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
      ...screenContainer,
      minHeight: screenHeight
    },
    stepHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
    },
    textInput: {
      height: 40,
      width: 300,
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 2,
      padding: 10,
      margin: 1,
      borderRadius: 10,
      borderColor: '#a6a6a6',
      shadowColor: '#a6a6a6',
      shadowRadius: 5,
      shadowOpacity: 0.75,
      shadowOffset: {
        width: 0,
        height: 2
      },
      borderColor: '#a6a6a6',
      borderLeftColor: '#f5f5f5',
      borderTopColor: '#f5f5f5',
      borderBottomColor: '#e1e1e1',
      borderRightColor: '#e1e1e1',
      backgroundColor: '#ffffff',
      
    },
    button: {
      flex: 1,
      ...popShadow,
      ...button,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    browser: {
      height: 400,
      width: 300,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: colors.grey,
      borderLeftColor: '#f1f1f1',
      borderTopColor: '#f1f1f1',
      borderBottomColor: '#e1e1e1',
      borderRightColor: '#e1e1e1',
      shadowColor: colors.grey,
      shadowRadius: 5,
      shadowOpacity: 0.75,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
});
