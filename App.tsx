import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContent from "./src/shared/components/AppContent";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { MoodProvider } from './src/shared/contexts/MoodContext';

/**
 * Main application component that serves as the root container
 * @returns JSX element for the main app interface
 */
function App(): JSX.Element {

  // Main return statement positioned near the top of the component
  return (
    <SafeAreaProvider>
      <MoodProvider>
      
      <NavigationContainer>

        <AppContent/>

      </NavigationContainer>
      </MoodProvider>

    </SafeAreaProvider>

  );
}


export default App;