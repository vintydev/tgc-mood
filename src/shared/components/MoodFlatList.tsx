import { FlatList, StyleSheet, Text } from "react-native";
import { Fonts } from "../constants/fonts";
import { ALL_MOODS } from "../utilities/moodUtils";
import CustomEmojiButton from "./CustomEmojiButton";
import eMoodType from "../types/mood/eMoodType";
import ConfirmButton from "./ConfirmButton";

type tMoodFlatListProps = {
    selectedMood: eMoodType | null;
    handleSelectMood: (mood: eMoodType) => void;
    handleConfirmMood?: (mood: eMoodType) => void;
    moodLogged?: boolean;
    confirmText?: string;
}

function MoodFlatList(props: tMoodFlatListProps) {
    
    const { selectedMood, handleSelectMood, handleConfirmMood, moodLogged, confirmText } = props;

    const data = ALL_MOODS;

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.containerButton}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={

                <Text style={[styles.welcomeFont, { fontSize: 16, fontFamily: Fonts.SFProLight }]}>
                    Today, you are feeling {selectedMood ? selectedMood.toLowerCase() + "." : "..."}
                </Text>

            }
            ListFooterComponent={
                <ConfirmButton
                    title={moodLogged ? "Mood already logged for today!" : "Confirm Mood"}
                    onPress={() => {
                        handleConfirmMood ? handleConfirmMood(selectedMood!) : null
                    }}
                    disabled={selectedMood === null || moodLogged}
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