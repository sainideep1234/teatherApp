import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Dashboard from './src/screens/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import Connection from './src/screens/Connection';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActiveCodeProvider } from './src/context/activeCode';
import { RelationshipProvider } from './src/context/relationship';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Connection"
        component={Connection}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ActiveCodeProvider>
          <RelationshipProvider>
            <MyStack />
          </RelationshipProvider>
        </ActiveCodeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
