import { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";
import tMoodEntry from "../types/mood/tMoodEntry";


type tProps = {
    id: string;
    moodEntry: tMoodEntry;
    children?: React.ReactNode;
    title?: string;
    cardStyle?: object;
    emoji?: string;
}

export default function MoodEntry(props: tProps): JSX.Element {
    const { id, moodEntry, children, cardStyle, title } = props;

    // Convert to date and format to readable format
    const entryDate = new Date(moodEntry.dateCreated);
    const formattedDate: string = entryDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <View key={id} style={[styles.entryContainer, cardStyle]}>
            <View style={styles.entryTitle}>
                <Text style={styles.entryDate}>{formattedDate}</Text>
                <Text style={styles.entryTime}>{entryDate.toLocaleTimeString(['en-GB'], { hour: '2-digit', minute: 'numeric' })}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.emoji}>
                    {moodEntry.selectedMood + " " + moodEntry.emoji}
                    </Text>
            </View>

            {/* Child components */}
            {children}
        </View>

    );
}

const styles = StyleSheet.create({
    entryContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 8,
    },
    entryTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'SF Pro Bold',
        fontSize: 18,
        marginBottom: 5,
    },
    entryMood: {
        fontSize: 18,
        fontFamily: 'SF Pro Regular',
    },
    emoji: {
        fontSize: 24,
        marginRight: 15,
        fontFamily: 'SF Pro Bold',

    },
    entryDate: {
        fontSize: 14,
        color: '#999',
        fontFamily: 'SF Pro Regular',
    },
    entryTime: {
        fontSize: 14,
        color: '#999',
        fontFamily: 'SF Pro Regular',
    }

})