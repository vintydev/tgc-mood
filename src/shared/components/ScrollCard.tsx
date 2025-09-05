import { JSX } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import tMoodEntry from "../types/mood/tMoodEntry";
import MoodEntry from "./MoodEntry";
import MoodPieChart from "./MoodPieChart";

type tProps = {
    title: string;
    children?: React.ReactNode;
    cardStyle?: object;
    moodEntries?: tMoodEntry[];
    description?: string;
}

export default function ScrollCard(props: tProps): JSX.Element
{
    const {title, children, cardStyle, moodEntries, description } = props;

    return (
        <View style={[styles.container, cardStyle]}>
            <Text style = {styles.welcomeFont}>{title}</Text>
            {description ? <Text style = {styles.descriptionFont}>{description}</Text> : null}
            <FlatList
                data={moodEntries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MoodEntry
                        id={item.id}
                        moodEntry={item}
                        title="Logged Mood"
                        cardStyle={{ marginVertical: 5 }}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            
            />

            {/* Child components */}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 15,
        maxHeight: 250,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    welcomeFont: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'SF Pro Bold',
        paddingHorizontal: 20,
    },
    descriptionFont:{
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'SF Pro Light',
        paddingHorizontal: 20,
        color: '#555',
    }
})