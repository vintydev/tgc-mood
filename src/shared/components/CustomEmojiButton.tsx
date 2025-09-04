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

    // Animation state (useref to persist values across renders)
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

}


// Component related logic (animations)

// Trigger animation to pressed state
function animateIn(scale: Animated.Value, opacity: Animated.Value)
{
    // Parallelly animate scale and opacity to pressed values
    Animated.parallel([

        // Scale down
        Animated.timing(scale, {
            toValue: SCALE_PRESSED,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }),

        // Decrease opacity
        Animated.timing(opacity, {
            toValue: OPACITY_PRESSED,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }),
    ]).start();
}

// Revert animation to original state
function animateOut(scale: Animated.Value, opacity: Animated.Value, callBack?: () => void)
{
    Animated.parallel([
        Animated.timing(scale, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }),
        Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }),
    ]).start(() => callBack ? callBack(): null); // Call callback after animation completes if provided
}