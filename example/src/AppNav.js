import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home'
import Profile from './Profile'
const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Profile'}}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;