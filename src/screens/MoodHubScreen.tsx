import { JSX, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { tCompositeTabScreenProps } from "../navigation/NavigationTypes";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { eTabRoute } from "../shared/types/eRoutes";
import { saveEntryAsync, LoadEntriesAsync, LoadPreviousEntryAsync, getEntryByIdAsync, deleteAllEntriesAsync } from "../shared/utilities/storageUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollCard from "../shared/components/ScrollCard";
import tMoodEntry from "../shared/types/mood/tMoodEntry";
import { useFocusEffect } from "@react-navigation/native";
import ConfirmButton from "../shared/components/ConfirmButton";
import { useMoodContext } from "../shared/contexts/MoodContext";
import MoodPieChart from "../shared/components/MoodPieChart";
import MoodLoadingIndicator from "../shared/components/MoodLoadingIndicator";


type tProps = tCompositeTabScreenProps<eTabRoute.Statistics>;

function MoodHubScreen({ navigation, route }: tProps): JSX.Element {


    // Get mood context for global state management
    const { entries, loading, TriggerRefresh } = useMoodContext();

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, }}
        >

            <SafeAreaView style={styles.container}>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <MoodLoadingIndicator />
                    </View>
                ) : (
              
                <View>
                    <View style={styles.headerContainer}>
                        <Text style={styles.welcomeFont}>Mood
                            <Text style={[{ color: '#6200ee', }, styles.welcomeFont]}> Hub</Text>
                        </Text>
                    </View>
                    <View style={styles.cardsContainer}>
                        <ScrollCard
                            title="Previous Mood Logs"
                            moodEntries={entries}
                            description={entries.length > 0 ? "" : "Your past mood entries will be listed below. Complete a mood log to see it appear here!"}
                        >
                        </ScrollCard>

                        <MoodPieChart
                            title="Mood Distribution"
                            moodEntries={entries}
                            cardStyle={{ alignSelf: 'center', marginBottom: 20 }}
                        />
                        <ConfirmButton
                            title="Delete All Entries"
                            onPress={async () => {
                                await deleteAllEntriesAsync();
                                TriggerRefresh();
                            }}
                            disabled={entries.length === 0}
                            buttonStyle={{ width: 200, alignSelf: 'center' }}

                        />
                    </View>
                </View>
                )}
            </SafeAreaView>
        </CustomLinearGradient>
    )

}

// Styles at bottom for better readability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listContainer: {
        width: '100%',
        marginTop: 20,
    },
    welcomeFont: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'SF Pro Bold',

    },
    loadingContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',

    },
    cardsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
       

});

export default MoodHubScreen;