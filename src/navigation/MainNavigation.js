import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigation';
import TripListDetail from '../component/TripDetailScreen';
import {createSharedElementStackNavigator } from 'react-navigation-shared-element';
import RegisterScreen from '../screen/RegisterScreen';


const Stack = createSharedElementStackNavigator();
const MainNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar hidden />
            <Stack.Navigator>
                <Stack.Screen name="Root" component={TabNavigator} options={{
                
                    headerShown: false,
                    useNativeDriver: true,
                    gestureEnabled: false,               
                   }}
                />
                <Stack.Screen name='TripDetails' component={TripListDetail} options={{
                    headerShown:false,
                }} />
                <Stack.Screen name='dangki' component={RegisterScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;