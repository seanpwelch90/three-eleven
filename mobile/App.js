import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormScreen } from './screens/Form';
import { FontAwesome } from '@expo/vector-icons';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainScreen}>
      <Text style={{ fontSize: 24, fontWeight: '600', color: 'white', marginBottom: 40}}>Welcome to Three Eleven</Text>
      <TouchableOpacity style={styles.newButton}
        onPress={() => navigation.navigate('Form')}
      ><FontAwesome style={{marginBottom: 10}} name="plus" size={24} color="white" />
        <Text style={{color: 'white', fontWeight: '600', textAlign: 'center'}}>New Request</Text></TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}
 />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#43AFE5' },
  newButton: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    padding: 10,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default App;