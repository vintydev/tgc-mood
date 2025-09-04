import { View, Text, Button, StyleSheet } from "react-native";
import { tCompositeTabScreenProps, tRootStackParamList, tRootStackScreenProps, tTabStackScreenProps } from "../navigation/NavigationTypes";
import { eRootRoute, eTabRoute } from "../shared/types/eRoutes";
import { JSX } from "react";
import CustomLinearGradient from "../shared/components/CustomLinearGradient";
import { FlatList } from 'react-native';


// Composite props for accessing both tab and root navigation routes
type tProps = tCompositeTabScreenProps<eTabRoute.MoodTracker>;

function MoodTrackerScreen({ navigation, route }: tProps): JSX.Element {
    return (
        <CustomLinearGradient
            colors={['#e6bee7ff', '#c4eaceff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >


            <View style={styles.container}>
                <Text style={styles.welcomeFont}>Welcome, Vincenzo!</Text>
            </View>
        </CustomLinearGradient>
    )
}

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

export default MoodTrackerScreen;