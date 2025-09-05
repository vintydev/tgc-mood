import { JSX } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { tCompositeTabScreenProps } from "../navigation/NavigationTypes";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { eTabRoute } from "../shared/types/eRoutes";
import { saveEntryAsync, LoadEntriesAsync, LoadPreviousEntryAsync, getEntryByIdAsync } from "../shared/utilities/storageUtils";
import { SafeAreaView } from "react-native-safe-area-context";


type tProps = tCompositeTabScreenProps<eTabRoute.Statistics>;

function MoodStatisticsScreen({ navigation, route }: tProps): JSX.Element {

    console.log("MoodStatisticsScreen Props:", { navigation, route });

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, }}
        >

            <SafeAreaView style={styles.container}>
                <Text style={styles.welcomeFont}>Mood History Screen - Coming Soon!</Text>
                <ScrollView>
                    <Text style={{ fontFamily: 'SF Pro Regular', fontSize: 16, color: '#333', flexWrap: 'wrap', margin: 10 }}>
                        This screen will display mood statistics and history over time.
                    </Text>
                    <Text style={{ fontFamily: 'SF Pro Regular', fontSize: 16, color: '#333', margin: 10 }}>
                        Stay tuned for updates!
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </CustomLinearGradient>
    )
}

// Styles at bottom for better readability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeFont: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'SF Pro Bold',
        paddingHorizontal: 20,
    }

});

export default MoodStatisticsScreen;