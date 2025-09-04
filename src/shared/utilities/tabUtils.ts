import { JSX } from "react";
import { StyleProp, ViewStyle } from "react-native";


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

export function getTabIcon(routeName: string, focussed: boolean): JSX.Element | string
{
    let iconName = '';
    switch (routeName) {
        case 'MoodTracker':
            iconName = focussed ? 'emoticon-happy' : 'emoticon-happy-outline';
            break;
        case 'Statistics':
            iconName = focussed ? 'chart-bar' : 'chart-bar';
            break;
        case 'Profile':
            iconName = focussed ? 'account' : 'account-outline';
            break;
        case 'Settings':
            iconName = focussed ? 'cog' : 'cog-outline';
            break;
        default:
            iconName = 'circle';
    }
    return iconName;

}