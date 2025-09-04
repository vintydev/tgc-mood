import { JSX } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Icon";


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

export function getTabIcon(routeName: string, focussed: boolean): string | JSX.Element
{
 
 

}