

import { JSX } from "react";
import LinearGradient from "react-native-linear-gradient";

// Define props
type tProps = {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    style?: object;
    children: React.ReactNode;
}

// Reusable functional component for a linear gradient background throughout application to be able to be customisable
function CustomLinearGradient({ colors, start, end, style, children }: tProps): JSX.Element
{
    return (
        <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={style}
        >
            {children}
        </LinearGradient>
    );
}

export default CustomLinearGradient;