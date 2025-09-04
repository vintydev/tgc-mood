import {FontAwesome6} from "@react-native-vector-icons/fontawesome6"
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
            <FontAwesome6 name="cross" size={size} color={color} iconStyle="solid" />
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})

