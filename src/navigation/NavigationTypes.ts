import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { eRootRoute, eTabRoute } from '../shared/types/eRoutes';

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

// Composite props (when a tab screen also sits inside the root stack)
export type tCompositeTabScreenProps<T extends keyof tTabStackParamList> =
    tTabStackScreenProps<T> & tRootStackScreenProps<keyof tRootStackParamList>;
