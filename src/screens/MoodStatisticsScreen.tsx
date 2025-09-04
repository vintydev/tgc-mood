import { JSX } from "react";
import { View, Text, StyleSheet } from "react-native";
import { tCompositeTabScreenProps } from "../navigation/NavigationTypes";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { eTabRoute } from "../shared/types/eRoutes";



type tProps = tCompositeTabScreenProps<eTabRoute.Statistics>;

function MoodStatisticsScreen({ navigation, route }: tProps): JSX.Element {

    console.log("MoodStatisticsScreen Props:", { navigation, route });

    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >

            <View style={styles.container}>
                <Text style={styles.welcomeFont}>Mood History Screen - Coming Soon!</Text>
            </View>
        </CustomLinearGradient>
    )
}

// Styles at bottom for better readability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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