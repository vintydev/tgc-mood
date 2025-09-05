import { View, Text, Button, StyleSheet, FlatList, Touchable, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { tCompositeTabScreenProps, tRootStackParamList, tRootStackScreenProps, tTabStackScreenProps } from "../navigation/NavigationTypes";
import { eRootRoute, eTabRoute } from "../shared/types/eRoutes";
import React, { JSX, useCallback, useEffect, useState } from "react";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { Fonts } from "../shared/constants/fonts";
import eMoodType from "../shared/types/mood/eMoodType";
import MoodFlatList from "../shared/components/MoodFlatList";
import tMoodEntry from "../shared/types/mood/tMoodEntry";
import { saveEntryAsync, LoadPreviousEntryAsync, LoadEntriesAsync } from "../shared/utilities/storageUtils";
import { DEV_MODE } from "../shared/constants/devMode";
import { SafeAreaView } from "react-native-safe-area-context";
import useMoodContext from "../shared/contexts/MoodContext";
import { useFocusEffect } from "@react-navigation/native";
import MoodLoadingIndicator from "../shared/components/MoodLoadingIndicator";


// Composite props for accessing both tab and root navigation routes
type tProps = tCompositeTabScreenProps<eTabRoute.MoodTracker>;


export default function MoodTrackerScreen({ navigation, route }: tProps): JSX.Element {

    // Get mood context for global state management
    const { todayEntry, loading, TriggerRefresh } = useMoodContext();

    // Local state for selected mood
    const [selectedMood, setSelectedMood] = useState<eMoodType | null>(null);

    // Moodl logged is true if todayEntry is not null
    const moodLogged = todayEntry !== null;

    // Once todayEntry changes, update selectedMood state 
    useEffect(() => {
        
        if (todayEntry) {
            setSelectedMood(todayEntry.selectedMood);
        }
        else {
            setSelectedMood(null);
        }
    }, [todayEntry]);

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >


            <View style={styles.container}>
                {loading ? (
                
                        <MoodLoadingIndicator />
              
                ) : (
                    <SafeAreaView style={styles.container}>

                        <Text style={styles.welcomeFont}>
                            Hello,
                            <Text style={[{ color: '#6200ee' }, styles.welcomeFont]}>
                                {' Vincenzo!'}
                            </Text>
                        </Text>

                        <MoodFlatList selectedMood={selectedMood} handleSelectMood={handleSelectMood} handleConfirmMood={handleConfirmMood} moodLogged={moodLogged} />

                    </SafeAreaView>
                )}
            </View>

        </CustomLinearGradient >

    )



    // This function updates the selected mood state when a mood is selected from the MoodFlatList
    function handleSelectMood(mood: eMoodType) {
        setSelectedMood(mood);
    }

    // This function handles confirming the selected mood, then saves it to storage using storageUtils
    function handleConfirmMood(selectedMood: eMoodType | null) {
        if (!selectedMood) return null;

        Alert.alert(
            "Confirm Mood",
            `Are you sure you want to confirm your mood as "${selectedMood}" for today?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Confirm",
                    onPress: async () => {
                        try {
                            await saveEntryAsync(selectedMood);

                            // Refresh context to reflect new entry
                            await TriggerRefresh();

                            Alert.alert("Success", "Your mood has been saved for today! Come back tomorrow to log again.");
                        }
                        catch (error) {
                            console.error("Error saving mood entry: ", error);
                            Alert.alert("Error", "There was an error saving your mood. Please try again.");
                        }
                    }
                }
            ]
        );
    }
}


// Styles at bottom for better readability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    welcomeFont: {
        fontSize: 30,
        fontFamily: Fonts.SFProBold,
        marginBottom: 8,
        textAlign: 'center',

    },

});

