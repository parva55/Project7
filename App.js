import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import S1 from './Screens/S1';
import S2 from './Screens/S2';

export default App = ({navigation}) => {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="S1" 
        screenOptions={{
          headerShown:false,
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'#393a3b'},
          headerTitleStyle:{color:'#fff'}
        }}>
        <Stack.Screen name="S1" component={S1} />
        <Stack.Screen name="S2" component={S2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};