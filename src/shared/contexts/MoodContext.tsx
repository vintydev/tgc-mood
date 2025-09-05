import { createContext, JSX, use, useCallback, useContext, useEffect, useState } from "react";
import tMoodEntry from "../types/mood/tMoodEntry";
import { deleteAllEntriesAsync, LoadEntriesAsync, LoadPreviousEntryAsync, saveEntryAsync } from "../utilities/storageUtils";
import eMoodType from "../types/mood/eMoodType";


type tMoodContext = {
    entries: tMoodEntry[];
    todayEntry: tMoodEntry | null;
    loading: boolean;
    refreshTrigger: number;
    TriggerRefresh: () => Promise<void>;
}

const MoodContext = createContext<tMoodContext | undefined>(undefined);

type tMoodProviderProps = {
    children: React.ReactNode;
}


export function MoodProvider({ children }: tMoodProviderProps): JSX.Element {
    const [entries, setEntries] = useState<tMoodEntry[]>([]);
    const [todayEntry, setTodayEntry] = useState<tMoodEntry | null>(null);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    // useEffect to load mood data on mount, or when refreshTrigger changes (+ 1)
    useEffect(() => {
        LoadMoodData();
        
    }, [refreshTrigger]);

    // Function to load mood data
    async function LoadMoodData(): Promise<void> {
        setIsLoading(true);

        try {
            // Get all entries from storage
            const loadedEntries = (await LoadEntriesAsync()).sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
            setEntries(loadedEntries ?? []);

            // Get today's entry if it exists
            const latestEntry = await LoadPreviousEntryAsync();
            const today = new Date();
            if (latestEntry && latestEntry.dateCreated.toDateString() === today.toDateString()) {
                setTodayEntry(latestEntry);
            }
            else {
                setTodayEntry(null);
            }
        }
        catch (error) {
            console.error("Error refreshing mood entries: ", error);
            setEntries([]);
            setTodayEntry(null);
        }
        finally {
            setIsLoading(false);
        }
    }

    function TriggerRefresh(): Promise<void> {

        setRefreshTrigger(prev => prev + 1);

        return Promise.resolve();
    }

    const contextValue: tMoodContext = {
        entries,
        todayEntry,
        loading,
        refreshTrigger,
        TriggerRefresh,
    };

    return (
        <MoodContext.Provider value={contextValue}>
            {children}
        </MoodContext.Provider>
    );
}

// Custom hook to use the mood context across the app
export function useMoodContext(): tMoodContext {
    const context = useContext(MoodContext);

    if (!context || context === undefined) throw new Error("useMoodContext must be used within a MoodProvider");

    return context;
}

// Default export for easier imports
export default useMoodContext;