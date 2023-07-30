// ©️ Kaitlin Radford 2023
// Attempted to create my own claymorphic theme without a ui library

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Library from './screens/Library';
import Account from './screens/Account';
import Add from './screens/Add';
import AddMore from './screens/AddMore';
import Folder from './screens/Folder';

import { UserProvider} from './user/context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name="Library" component={Library} options={{ headerShown: false }}/>
          <Stack.Screen name="Add" component={Add} options={{ title: 'Add Folder' }}/>
          <Stack.Screen name="AddMore" component={AddMore} options={{ title: 'Add More Notes' }}/>
          <Stack.Screen name="Account" component={Account} options={{ title: '' }}/>
          <Stack.Screen name="Folder" component={Folder} options={({ route }) => ({ title: route.params.folder.name, headerStyle: { backgroundColor: route.params.appColor } })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
