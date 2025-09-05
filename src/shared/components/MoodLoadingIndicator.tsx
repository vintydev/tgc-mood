import { JSX } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Fonts } from "../constants/fonts";


type tProps = {
    size?: number;
    color?: string;
}

export default function MoodLoadingIndicator(props: tProps): JSX.Element {
    const { size = 50, color = "#6200ee" } = props;

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.loadingFont}>Loading moods...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingFont: {
        marginTop: 10,
        fontSize: 16,
        color: '#6200ee',
        fontFamily: Fonts.SFProRegular,
    },
});