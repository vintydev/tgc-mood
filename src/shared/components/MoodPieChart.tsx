import { JSX, useEffect, useState } from "react";
import tMoodEntry from "../types/mood/tMoodEntry";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from 'react-native-chart-kit';
import useMoodContext from "../contexts/MoodContext";
import MoodLoadingIndicator from "./MoodLoadingIndicator";


type tProps = {
    title: string;
    children?: React.ReactNode;
    cardStyle?: object;
    moodEntries?: tMoodEntry[];
}

export default function MoodPieChart(props: tProps): JSX.Element {
    const { moodEntries: entries = [] } = props;
    const { loading } = useMoodContext();
    const [moodCounts, setMoodCounts] = useState<Record<string, number>>({
        Happy: 0,
        Sad: 0,
        Neutral: 0,
        Angry: 0,
        Excited: 0,
        Anxious: 0,
        Tired: 0,
    });

    // Use effect to count moods whenever entries change, and when component mounts
    useEffect(() => {
        countMoods(entries, moodCounts);
    }, [entries]);

    return (
        <View style={styles.container}>

            <Text style={styles.welcomeFont}>{props.title}</Text>
            {loading ?
                <View>
                    <MoodLoadingIndicator />
                </View>
                :
                <PieChart
                    data={[
                        {
                            name: 'Happy',
                            population: moodCounts.Happy,
                            color: 'rgba(131, 167, 234, 1)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Sad',
                            population: moodCounts.Sad,
                            color: 'rgba(111, 65, 65, 1)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Neutral',
                            population: moodCounts.Neutral,
                            color: 'yellow',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Angry',
                            population: moodCounts.Angry,
                            color: 'red',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Excited',
                            population: moodCounts.Excited,
                            color: 'green',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Anxious',
                            population: moodCounts.Anxious,
                            color: 'purple',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Tired',
                            population: moodCounts.Tired,
                            color: 'gray',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={300}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,

                        },
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                    hasLegend={true}
                    avoidFalseZero

                />
            }

            {/* Child components */}
            {props.children}

        </View>
    )
    // Helper function to count mood occurrences
    function countMoods(entries: tMoodEntry[], moodCounts: Record<string, number>): void {

        if (entries.length === 0) return;

        // For each entry, increment the corresponding mood count
        entries.forEach(entry => {

            if (entry.selectedMood in moodCounts) 
            {
                setMoodCounts(prevCounts => ({
                    ...prevCounts,
                    [entry.selectedMood]: prevCounts[entry.selectedMood] + 1
                }));
            }
        });

    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 15,
        maxHeight: 350,
        width: 300,
        maxWidth: 500,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    welcomeFont: {
        fontFamily: 'SF Pro Bold',
        fontSize: 20,
        marginBottom: 10,
    },
    descriptionFont: {
        fontFamily: 'SF Pro Regular',
        fontSize: 14,
        marginBottom: 10,
    },
})