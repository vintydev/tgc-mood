
import MoodTrackerScreen from "../screens/MoodTrackerScreen";
import { eTabRoute } from "../shared/types/eRoutes";
import { tTabStackParamList } from "./NavigationTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator<tTabStackParamList>();

// This function sets up the btm tab navigator with its accompanying screens
// Avoids magic strings by using enum for route names
export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName={eTabRoute.MoodTracker} // Default to MoodTracker tab (home)
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true, // Hide tab bar when keyboard open
            }}
        >
            <Tab.Screen
                name={eTabRoute.MoodTracker}
                component={MoodTrackerScreen}
    
                
                options={{ title: 'Mood Tracker' }}
            />
            {/* <Tab.Screen
                name={eTabRoute.Statistics}
                component={StatisticsScreen}
                options={{ title: 'Statistics' }}
            />
            <Tab.Screen
                name={eTabRoute.Profile}
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
            <Tab.Screen
                name={eTabRoute.Settings}
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            /> */}
        </Tab.Navigator>

    );
}