import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './components/Main/Main';
// import { StyleSheet, Text, View } from 'react-native';

import Home from './Views/Home/Home';
import Detail from './components/Detail/Detail';
import NewRegister from './components/NewRegister/NewRegister';


const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Welcome'
            component={Home}
          />
          <Stack.Screen
            name='Passwords'
            component={Main}
          />
          <Stack.Screen
            name='Details'
            component={Detail}
            options={({route})=>({title: route.params.name})}
          />
          <Stack.Screen
            name='New Register'
            component={NewRegister}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
