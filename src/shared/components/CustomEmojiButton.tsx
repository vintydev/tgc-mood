import { useRef } from "react";
import { Animated, ColorSchemeName, useColorScheme, ViewStyle, GestureResponderEvent } from "react-native";


// Define constants for button styling and ani
const BTN_SIZE = 72;
const BTN_BORDER_RADIUS = BTN_SIZE / 2;
const LABEL_FONT_SIZE = 14;
const EMOJI_FONT_SIZE = 32;
const SCALE_PRESSED = 0.85;
const OPACITY_PRESSED = 0.7;
const ANIMATION_DURATION = 100; // in ms

// Define props
export type tCustomEmojiButtonProps =
    {
        emoji: string;
        label?: string;
        onPress?: (event: GestureResponderEvent) => void;
        style?: ViewStyle;
        selected?: boolean;
        disabled?: boolean;
    }

// Touch friendly emoji button component with a small animation on press
export default function CustomEmojiButton(props: tCustomEmojiButtonProps) 
{

    // Destructure props from params
    const { emoji, label, onPress, style, selected = false, disabled = false } = props;

    // Determine if the current color scheme is dark mode
    const colorScheme: ColorSchemeName = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // Animation state
    const scale = useRef(new Animated.Value(1)).current;

}