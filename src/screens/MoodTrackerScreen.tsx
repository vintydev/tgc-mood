import { View, Text, Button, StyleSheet, FlatList, Touchable, TouchableOpacity, Alert } from "react-native";
import { tCompositeTabScreenProps, tRootStackParamList, tRootStackScreenProps, tTabStackScreenProps } from "../navigation/NavigationTypes";
import { eRootRoute, eTabRoute } from "../shared/types/eRoutes";
import React, { JSX, useEffect, useState } from "react";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { Fonts } from "../shared/constants/fonts";
import eMoodType from "../shared/types/mood/eMoodType";
import MoodFlatList from "../shared/components/MoodFlatList";
import tMoodEntry from "../shared/types/mood/tMoodEntry";
import { saveEntryAsync, LoadPreviousEntryAsync, LoadEntriesAsync } from "../shared/utilities/storageUtils";
import { DEV_MODE } from "../shared/constants/devMode";


// Composite props for accessing both tab and root navigation routes
type tProps = tCompositeTabScreenProps<eTabRoute.MoodTracker>;


export default function MoodTrackerScreen({ navigation, route }: tProps): JSX.Element {

    // State to hold the selected mood (via emoji button)
    const [selectedMood, setSelectedMood] = useState<eMoodType | null>(null);
    const [moodLogged, setMoodLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const entries = LoadEntriesAsync();
    const today = new Date();

    // useEffect hook to check if a mood has already been logged for today on component mount and when entries change
    useEffect(() => {

        CheckTodayEntry();

    }, [entries]);

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {loading ? (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ fontFamily: Fonts.SFProRegular, fontSize: 16, color: '#333' }}>Loading...</Text>
                </View>
            ) :

                <View style={styles.container}>

                    <Text style={styles.welcomeFont}>
                        Hello,
                        <Text style={[{ color: '#6200ee' }, styles.welcomeFont]}>
                            {' Vincenzo!'}
                        </Text>
                    </Text>

                    <MoodFlatList selectedMood={selectedMood} handleSelectMood={handleSelectMood} handleConfirmMood={handleConfirmMood} moodLogged={moodLogged} />


                </View >
            }
        </CustomLinearGradient >

    )


    // Helper function to check if a mood entry exists for today (used in useEffect)
    async function CheckTodayEntry(): Promise<void> {

        if(DEV_MODE)
        {
            console.log("DEV_MODE is on; skipping today's entry check (for showcase).");
            setLoading(false);
            return;
        }

        try {
            // Most recent entry
            const todayEntry = await LoadPreviousEntryAsync();

            // If entry exists and its dateCreated matches today's date, set moodLogged to true
            if (todayEntry?.dateCreated.toDateString() === today.toDateString()) {

                console.log("Entry found for today: ", todayEntry);
                setMoodLogged(true);
                setSelectedMood(todayEntry.selectedMood);
                console.log("Mood already logged today: ", todayEntry);
                return;
            }
            else {
                console.log("No entry found for today.");
                setMoodLogged(false);
                setSelectedMood(null);
            }

        }
        catch (error) {
            console.error("Error checking today's entry: ", error);
            setMoodLogged(false);
            setSelectedMood(null);
        }
        finally {
            setLoading(false);
        }
    }

    // This function updates the selected mood state when a mood is selected from the MoodFlatList
    function handleSelectMood(mood: eMoodType) {
        setSelectedMood(mood);
        console.log("Selected mood: ", mood);
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
                            Alert.alert("Success", "Your mood has been saved for today! Come back tomorrow to log again.");
                        }
                        catch (error) {
                            console.error("Error saving mood entry: ", error);
                            Alert.alert("Error", "There was an error saving your mood. Please try again.");
                        }
                        finally {
                            setMoodLogged(true);
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
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    welcomeFont: {
        fontSize: 26,
        fontFamily: Fonts.SFProBold,
        marginBottom: 8,
        textAlign: 'center',

    }

});

