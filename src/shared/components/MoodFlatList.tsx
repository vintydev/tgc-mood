import { FlatList, StyleSheet, Text } from "react-native";
import { Fonts } from "../constants/fonts";
import { ALL_MOODS, getMoodById } from "../utilities/moodUtils";
import CustomEmojiButton from "./CustomEmojiButton";
import eMoodType from "../types/mood/eMoodType";
import ConfirmButton from "./ConfirmButton";
import { useEffect, useState } from "react";

type tMoodFlatListProps = {
    selectedMood: eMoodType | null;
    handleSelectMood: (mood: eMoodType) => void;
    handleConfirmMood?: (mood: eMoodType) => void;
    moodLogged?: boolean;
    confirmText?: string;
}

function MoodFlatList(props: tMoodFlatListProps) {

    const { selectedMood, handleSelectMood, handleConfirmMood, moodLogged} = props;
    const [selectedMoodEmoji, setSelectedMoodEmoji] = useState<string | null>(null);

    // Data for FlatList
    const data = ALL_MOODS;

    // Helper to get mood object by id
    useEffect(() => {
        if (selectedMood) 
        {
            const mood = getMoodById(selectedMood);
            setSelectedMoodEmoji(mood.emoji);

        }
        else 
        {
            setSelectedMoodEmoji(null);
        }
    }, [selectedMood]);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.containerButton}
            showsHorizontalScrollIndicator={false}
            
            ListHeaderComponent={

                <Text style={[styles.welcomeFont, { fontSize: 16, fontFamily: Fonts.SFProLight }]}>
                    Today, you {moodLogged ? "were" : "are"} feeling {""}
                    {selectedMood ? selectedMood.toLowerCase() + ` ${selectedMoodEmoji}` : moodLogged ? `${selectedMood}` : "...?"}
                </Text>

            }
            ListFooterComponent={
                <ConfirmButton
                    title={moodLogged ? "Mood already logged today!" : "Confirm Mood"}
                    onPress={() => {
                        handleConfirmMood ? handleConfirmMood(selectedMood!) : null
                    }}
                    disabled={moodLogged || !selectedMood}
                    buttonStyle={{ marginTop: 20 }}
                />

            }
            renderItem={({ item }) => (
                <CustomEmojiButton
                    emoji={item.emoji}
                    label={item.label}
                    onPress={() => {
                        console.log("Pressed mood: ", item.id);
                        handleSelectMood(item.id)
                    }}
                    selected={selectedMood === item.id}
                    style={{ marginVertical: 1 }}
                    disabled={moodLogged}
                />
            )}

        />
    )
}

export default MoodFlatList;


// Styles at bottom for better readability
const styles = StyleSheet.create({
    containerButton: {
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeFont: {
        fontSize: 20,
        fontFamily: Fonts.SFProBold,
        marginBottom: 8,
        textAlign: 'center',

    }

});