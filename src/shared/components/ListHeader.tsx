import { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";
import tMoodEntry from "../types/mood/tMoodEntry";
import ConfirmButton from "./ConfirmButton";

type tProps = {
    entries: tMoodEntry[];
    onDeleteAll: () => void;
    disabled: boolean;
}

export default function ListHeader(props: tProps): JSX.Element {
    const { entries, onDeleteAll, disabled } = props;

    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerContainer}>
                <Text style={styles.welcomeFont}>Mood
                    <Text style={[{ color: '#6200ee', }, styles.welcomeFont]}> Hub</Text>
                </Text>
            </View>
            <View />
            {/* Delete All button, disabled if no entries or disabled prop is true */}
            <ConfirmButton
                title="Delete All"
                onPress={onDeleteAll}
                disabled={disabled || entries.length === 0}
                buttonStyle={styles.deleteButton}
                textStyle={styles.deleteButtonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
   
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    welcomeFont: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
});