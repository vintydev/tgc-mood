import { View, Text, Button } from "react-native";
import { tCompositeTabScreenProps, tRootStackParamList, tRootStackScreenProps, tTabStackScreenProps } from "../navigation/NavigationTypes";
import { eRootRoute, eTabRoute } from "../shared/types/eRoutes";
import { JSX } from "react";


// Composite props for accessing both tab and root navigation routes
type tProps = tCompositeTabScreenProps<eTabRoute.MoodTracker>;

function MoodTrackerScreen({ navigation }: tProps): JSX.Element
{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Mood Tracker Screen</Text>
            
       
        </View>
    )
}

export default MoodTrackerScreen;