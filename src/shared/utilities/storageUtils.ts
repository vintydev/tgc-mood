import AsyncStorage from '@react-native-async-storage/async-storage';
import tMoodEntry from '../types/tMoodEntry';
import eMoodType from '../types/eMoodType';
import { generateUniqueID } from './generateID';
import eTrendDirection from '../types/eTrendDirection';

export const MOOD_KEY = 'moodEntries';


// Function to load mood entries from AsyncStorage 
export async function LoadEntriesAsync(): Promise<tMoodEntry[]> 
{
    try 
    {
        // Attempt to load the entries from storage in JSON format
        const rawJSON = await AsyncStorage.getItem(MOOD_KEY);

        // If none are found, return empty array
        if (!rawJSON) return [];

        // Collect parsed entries
        const parsedEntries: unknown = JSON.parse(rawJSON); // Unknown for now

        // If parsed entries is an array (reduce possibility of runtime error), return it as tMoodEntry[]
        if (Array.isArray(parsedEntries)) 
        {
            return parsedEntries as tMoodEntry[];
        }

        // Else, return empty array
        return [];
    }
    catch (e) 
    {
        console.error("Error loading entries from storage: ", e);
        return []; // Return empty array on error
    }
}

export async function LoadPreviousEntryAsync(): Promise<tMoodEntry | null> 
{
    try 
    {
        const entries = await LoadEntriesAsync();
        if (entries.length === 0) return null;

        // Sort entries by dateCreated descending to get the most recent entry
        const sortedEntries = entries.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
        return sortedEntries[0];
    }
    catch (e) 
    {
        console.error("Error loading previous entry: ", e);
        return null;
    }
}

export async function saveEntryAsync(mood: eMoodType): Promise<void>
 {
    // Early return if entry is null or otherwise invalid
    if (!mood) return;

    // Load previous entry to determine trend direction, else null if none exists
    const previousEntry = await LoadPreviousEntryAsync() ?? null;

    // Calculate trend direction based on new mood and previous entry's mood
    const direction = await calculateTrendDirection(mood, previousEntry?.selectedMood);

    const newEntry: tMoodEntry = {
        id: generateUniqueID(),
        selectedMood: mood,
        dateCreated: new Date(),
        trendDirection: direction,
    }
    
    try 
    {
        // Load existing entries
        const existingEntries = await LoadEntriesAsync();

        // Append new entry to existing entries
        const updatedEntries = [...existingEntries, newEntry];

        // Save updated entries back to AsyncStorage in JSON format
        await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(updatedEntries));
    }
    catch (e) 
    {
        console.error("Error saving entry to storage: ", e);
    }
  
}



// Inner function to calculate trend direction based on new and previous mood
async function calculateTrendDirection(newMood: eMoodType, prevMood?: eMoodType): Promise<eTrendDirection> {
    try 
    {
        // Early return if no previous mood
        if (!prevMood) return eTrendDirection.None;

        // If match, return stable
        if (newMood === prevMood) return eTrendDirection.Stable;

        // Return improving or worsening based on comparison
        return newMood > prevMood ? eTrendDirection.Improving : eTrendDirection.Worsening;

    }
    catch (e) 
    {
        console.error("Error calculating trend direction: ", e);
        return eTrendDirection.None;
    }
    
}