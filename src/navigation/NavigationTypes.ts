import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { eRootRoute, eTabRoute } from '../shared/types/eRoutes';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// Root stack routes )
export type tRootStackParamList =
    {
        [eRootRoute.TabNavigator]: undefined; // No params, just shows the tab navigator
        [eRootRoute.AddMoodEntry]: undefined;
        [eRootRoute.MoodEntryDetail]: { entryId: string };
        [eRootRoute.MoodHistory]: { filterKey?: string } | undefined; // Optional filter key
    };

// Tab routes
export type tTabStackParamList =
    {
        [eTabRoute.MoodTracker]: undefined;// Home screen, no params
        [eTabRoute.Statistics]: { filterKey?: string } | undefined;
        [eTabRoute.Profile]: { userId: string } | undefined;
        [eTabRoute.Settings]: undefined;
    };

// Typed props for screens
export type tRootStackScreenProps<T extends keyof tRootStackParamList> =
    NativeStackScreenProps<tRootStackParamList, T>;
export type tTabStackScreenProps<T extends keyof tTabStackParamList> =
    NativeStackScreenProps<tTabStackParamList, T>;

// Composite props (when a tab screen also sits inside the root stack, prevents prop type errors)
export type tCompositeTabScreenProps<T extends keyof tTabStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<tTabStackParamList, T>,
        tRootStackScreenProps<keyof tRootStackParamList>
    >;
