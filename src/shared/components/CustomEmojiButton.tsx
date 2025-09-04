import { useRef } from "react";
import { Animated, ColorSchemeName, useColorScheme, ViewStyle, GestureResponderEvent, Pressable, TextStyle, StyleSheet } from "react-native";
import { Fonts } from "../constants/fonts";


// Define constants for button styling and ani
const SCALE_PRESSED = 0.95;
const OPACITY_PRESSED = 0.8;
const ANIMATION_DURATION = 100; // in ms

// Define props
export type tCustomEmojiButtonProps =
    {
        emoji: string;
        label?: string;
        onPress?: () => void;
        style?: ViewStyle;
        selected?: boolean;
        disabled?: boolean;
    }

// Touch friendly emoji button component with a small animation on press
export default function CustomEmojiButton(props: tCustomEmojiButtonProps) {

    // Destructure props from params
    const { emoji, label, onPress, style, selected = false, disabled = false } = props;

    // Determine if the current color scheme is dark mode
    const colorScheme: ColorSchemeName = useColorScheme();
    // const isDarkMode = colorScheme === 'dark';

    // Animation state (useref to persist values across renders)
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    return (
        <Pressable
            disabled={disabled}
            onPressIn={() => animateIn(scale, opacity)}
            onPressOut={() => animateOut(scale, opacity)}
            onPress={onPress}
            style={({ pressed }) => [
                styles.wrapper,
                style,
                pressed && { opacity: 0.75},
                disabled && { opacity: 0.5 }

            ]}
        >
            <Animated.View style={[
                styles.button,
                {
                    transform: [{ scale }],
                    opacity,
                },
                selected && styles.selectedRing,
                disabled && styles.disabledOverlay
            ]}
            >
                <Animated.Text style={[styles.emoji, { fontSize: 16 }]}>
                    {emoji}
                </Animated.Text>

                {label ? (
                    <Animated.Text style={[
                        styles.label,
                        { color: colorScheme === 'dark' ? '#FFF' : '#000', fontSize: 12 },
                        disabled && styles.labelDisabled
                    ]}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                    >
                        {label}
                    </Animated.Text>
                ) : null}
            </Animated.View>
        </Pressable>
    )

}

const styles = StyleSheet.create<{
    wrapper: ViewStyle;
    button: ViewStyle;
    emoji: TextStyle;
    label: TextStyle;
    selectedRing: ViewStyle;
    disabledOverlay: ViewStyle;
    labelDisabled: TextStyle;
}>({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        minWidth: 200,
        minHeight: 50,

        borderRadius: 30,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.55,
        shadowRadius: 3,
        shadowColor: '#000',
        overflow: 'hidden',
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#DDD',

    },
    emoji: {
        textAlign: 'center',
        marginBottom: 2,
        fontSize: 24,
        includeFontPadding: false,
    },
    label: {
        textAlign: 'center',
        fontFamily: Fonts.SFProBold,
    },
    selectedRing: {
        borderWidth: 2,
    },
    disabledOverlay: {
        opacity: 0.5,
    },
    labelDisabled: {
        opacity: 0.5
    },
});


function handleOnPress() {
    console.log("Button pressed!");
}


// Component related logic (animations)

// Trigger animation to pressed state
function animateIn(scale: Animated.Value, opacity: Animated.Value) {
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
function animateOut(scale: Animated.Value, opacity: Animated.Value, callBack?: () => void) {
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
    ]).start(() => callBack ? callBack() : null); // Call callback after animation completes if provided
}