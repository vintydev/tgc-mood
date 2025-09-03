import Ionicons from "@react-native-vector-icons/ionicons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";


type tProps = {
    onPress: () => void;
    color?: string;
    size?: number;
}

// This component renders a close button for the header for iOS only
export default function HeaderCloseButton({ onPress, color = '#000', size = 24 }: tProps) {

    // Early return for non iOS platforms
    if (Platform.OS !== 'ios') return null;

    // Return a touchable icon button
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Ionicons name="close" size={size} color={color} />
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})

