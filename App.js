/* eslint-disable no-unused-vars */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';


const App = () => {
  return (
    <AudioProvider>
 <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
    </AudioProvider>
  )
 
}
export default App;
