import { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";



export default function EmptyList(): JSX.Element {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No entries yet</Text>
            <Text style={styles.emptyDesc}>
                Your past mood entries will be listed here. Complete a mood log to see it appear!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        color: '#6200ee',
    },
    emptyDesc: {
        fontSize: 16,
        textAlign: 'center',
        color: '#777',
    },
});  