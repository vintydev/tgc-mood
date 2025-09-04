import React, { JSX } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {FontAwesome6} from "@react-native-vector-icons/fontawesome6"


export const TAB_BASE_STYLE: ViewStyle = {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
};

export function tabBgWithOpacity(opacity: number): StyleProp<ViewStyle> {
    return {
        ...TAB_BASE_STYLE,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
}

// Function to return the appropriate icon for each tab via jsx element based on its name and focus state
export function getTabIcon(routeName: string, focused: boolean, color: string, size: number): JSX.Element 
{

    console.log("Route Name: ", routeName);

    switch (routeName) 
    {
        case 'MoodTracker':
            return <FontAwesome6 name={'face-smile'} iconStyle="solid" size={24} color={ '#8E8E93'} />;
            
        case 'Statistics':
            return <FontAwesome6 name={'laptop-medical'} iconStyle="solid" size={24} color={ '#8E8E93'} />;
        default:
            return <FontAwesome6 name={'question'} iconStyle="solid" size={24} color={ '#8E8E93'} />;
    }

}