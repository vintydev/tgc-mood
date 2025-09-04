import { ViewStyle, TextStyle, Pressable, Text, StyleSheet } from "react-native";


type tButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

// A reusable confirm button component with customizable styles and disabled state
export default function ConfirmButton(props: tButtonProps) 
{

    const { title, onPress, disabled = false, buttonStyle, textStyle } = props;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                {
                    backgroundColor: disabled ? '#ccc' : '#6200ee',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.75 : 1,
                },
                buttonStyle
            ]}
        >
            <Text style={[
                {
                    color: disabled ? '#666' : '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                },
                textStyle
            ]}>
                {title}
            </Text>
        </Pressable>
    )
}



