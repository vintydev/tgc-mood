import { Platform } from "react-native";

// Constant function to check if the platform is iOS
export default function isiOS(): boolean 
{
    return Platform.OS === 'ios';
}