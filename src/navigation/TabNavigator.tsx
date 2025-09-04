
import { StyleSheet } from "react-native";
import MoodTrackerScreen from "../screens/MoodTrackerScreen";
import { eTabRoute } from "../shared/types/eRoutes";
import { tTabStackParamList } from "./NavigationTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { tabBgWithOpacity } from "../shared/utilities/tabUtils";


const Tab = createBottomTabNavigator<tTabStackParamList>();

// This function sets up the btm tab navigator with its accompanying screens
// Avoids magic strings by using enum for route names
export default function TabNavigator() {
    return (
        <Tab.Navigator
            // Default to MoodTracker tab (home)
            initialRouteName={eTabRoute.MoodTracker}
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarStyle: tabBgWithOpacity(0.7),
                tabBarBackground: () => (
                    <CustomLinearGradient
                        colors={['#e6bee7ff', '#c4eaceff']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ flex: 1 }} children={undefined}                    />
                ),
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: '#222222',
                tabBarLabelStyle: { fontSize: 12 },
            })}

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

