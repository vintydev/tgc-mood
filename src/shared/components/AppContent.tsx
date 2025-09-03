import { StatusBar, View } from "react-native";
import isiOS from "../utilities/isiOS";
import RootNavigator from "../../navigation/RootNavigator";

// This functional component serves as the main content area of the app, including status bar and navigation
function AppContent(): React.JSX.Element {
    return (
        <View style={{ flex: 1 }}>

            {!isiOS() && ( // Only show status bar on Android for better appearance, ios already handles it natively
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
            )}
            <RootNavigator />
        </View>
    )

}
export default AppContent;