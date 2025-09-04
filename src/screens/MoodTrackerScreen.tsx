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


// Composite props for accessing both tab and root navigation routes
type tProps = tCompositeTabScreenProps<eTabRoute.MoodTracker>;


export default function MoodTrackerScreen({ navigation, route }: tProps): JSX.Element {

    // State to hold the selected mood (via emoji button)
    const [selectedMood, setSelectedMood] = useState<eMoodType | null>(null);
    const [moodLogged, setMoodLogged] = useState<boolean>(false);
    const entries = LoadEntriesAsync();
    console.log("Loaded entries: ", entries);

    useEffect(() => {

        async function checkTodayEntry(): Promise<void> {

            const todayEntry = await LoadPreviousEntryAsync()

            if (!todayEntry) return;

            setMoodLogged(true);
            console.log("Mood already logged for today: ", todayEntry);

        }

        checkTodayEntry();
    }, [entries]);

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >

            <View style={styles.container}>

                <Text style={styles.welcomeFont}>
                    Hello, Vincenzo!
                </Text>

                <MoodFlatList selectedMood={selectedMood} handleSelectMood={handleSelectMood} handleConfirmMood={handleConfirmMood} moodLogged />


            </View >
        </CustomLinearGradient >

    )

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
                            setSelectedMood(null);
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
    },
    welcomeFont: {
        fontSize: 20,
        fontFamily: Fonts.SFProBold,
        marginBottom: 8,
        textAlign: 'center',

    }

});

