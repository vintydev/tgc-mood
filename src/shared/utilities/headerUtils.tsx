import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { tRootStackParamList } from "../../navigation/NavigationTypes";
import HeaderCloseButton from "../components/HeaderCloseButton";
import { eRootRoute } from "../types/eRoutes";
import tModalRoutes from "../types/tModalRoutes";

// Utility function to get a header left component (close button) for modal screens (returns a React element)
export function getModalHeaderLeft(navigation: NativeStackNavigationProp<tRootStackParamList, tModalRoutes>): React.JSX.Element
{
    // Return an element that calls navigation.goBack() when pressed
    return <HeaderCloseButton onPress={() => navigation.goBack()} />;
}