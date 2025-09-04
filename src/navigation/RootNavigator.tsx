import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { tRootStackParamList } from "./NavigationTypes";
import { eRootRoute } from "../shared/types/eRoutes";
import TabNavigator from "./TabNavigator";
import { Platform, StyleSheet } from "react-native";
import { getModalHeaderLeft } from "../shared/utilities/headerUtils";
import isiOS from "../shared/utilities/isiOS";

const RootStack = createNativeStackNavigator<tRootStackParamList>();

// Root stack navigator of the application; defaults to MoodTracker tab on launch
// Avoids magic strings by using enum for route names
export default function RootNavigator() {
    return (
        <RootStack.Navigator
            initialRouteName={eRootRoute.TabNavigator} // Default to tab navigator
            screenOptions={{
                gestureEnabled: false,
                animation: 'slide_from_right',
                headerShown: false, // Default to no headers on screens
            }}
        >
            <RootStack.Screen
                name={eRootRoute.TabNavigator}
                component={TabNavigator}
            />
            {/* <RootStack.Screen
                name={eRootRoute.AddMoodEntry}
                component={AddMoodEntryScreen}
                options={({ navigation, route }) => ({
                    title: 'Add Mood Entry',
                    presentation: 'modal', // iOS only, Android uses default slide animation
                    animation: 'slide_from_bottom',
                    headerShown: true, // Show header (could show info)
                    contentStyle: { ...styles.modal }, // Custom style for modal
                    gestureEnabled: isiOS(),
                    headerLeft: isiOS() ? () => getModalHeaderLeft(navigation) : undefined,
                })} */}

            {/* /> */}
            {/* <RootStack.Screen
                name={eRootRoute.MoodEntryDetail}
                component={MoodEntryDetailScreen}
                options={({ navigation, route }) => ({
                    title: 'Mood Entry Detail',
                    presentation: 'modal', // iOS only, Android uses default slide animation
                    animation: 'slide_from_bottom',
                    headerShown: true, // Show header
                    contentStyle: { ...styles.modal },
                    gestureEnabled: isiOS(),
                    headerLeft: isiOS() ? () => getModalHeaderLeft(navigation) : undefined,
                })}
            />
            <RootStack.Screen
                name={eRootRoute.MoodHistory}
                component={MoodHistoryScreen}
                options={{ title: 'Mood History' }}
            /> */}


        </RootStack.Navigator>
    );

}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.5)' : '#fff', // Transparent bg for iOS modal
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    }
});
