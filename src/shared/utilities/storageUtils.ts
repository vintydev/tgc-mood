import AsyncStorage from '@react-native-async-storage/async-storage';
import tMoodEntry from '../types/mood/tMoodEntry';
import eMoodType from '../types/mood/eMoodType';
import { generateUniqueID } from './generateID';
import eTrendDirection from '../types/mood/eTrendDirection';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getEmojiByMoodId } from './moodUtils';

export const MOOD_KEY: string = 'moodEntries';


// Function to load mood entries from AsyncStorage 
export async function LoadEntriesAsync(): Promise<tMoodEntry[]> 
{
    try 
    {
        // Attempt to load the entries from storage in JSON format
        const rawJSON: string | null = await AsyncStorage.getItem(MOOD_KEY)

        // If none are found, return empty array
        if (!rawJSON) return [];

        // Collect parsed entries
        const parsedEntries: tMoodEntry[] = JSON.parse(rawJSON);

        // If parsed entries is an array, convert date strings back to Date objects and return
        if (Array.isArray(parsedEntries)) 
        {
            // Convert date strings back to Date objects
            await convertBackToDate(parsedEntries);

            // Return the parsed entries
            return parsedEntries;
        }

        // Else, return empty array
        return [];
    }
    catch (error) 
    {
        console.error("Error loading entries from storage: ", error);
        return []; // Return empty array on error
    }
}

// Load the previous entry (most recent by dateCreated) or null if none exist
export async function LoadPreviousEntryAsync(): Promise<tMoodEntry | null> 
{
    try 
    {
        // Get entries
        const entries: tMoodEntry[] = await LoadEntriesAsync();

        console.log("All entries loaded for previous entry check: ", entries);

        // If no entries, early return null
        if (entries.length === 0) return null;

        // Sort entries by dateCreated descending to get the most recent entry, then sort
        const sortedEntries: tMoodEntry[] = await convertBackToDate(entries);
        sortedEntries.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());

        // Return the most recent entry (first in sorted array, since sorted descending)
        return sortedEntries[0];
    }
    catch (error) 
    {
        console.error("Error loading previous entry: ", error);
        return null;
    }
}

// Save a new mood entry, calculating trend direction based on previous entry if it exists
export async function saveEntryAsync(mood: eMoodType): Promise<void> 
{
    // Early return if entry is null or otherwise invalid
    if (!mood) return;

    // Create new mood entry
    const newEntry: tMoodEntry =
    {
        id: generateUniqueID(),
        selectedMood: mood,
        emoji: getEmojiByMoodId(mood),
        dateCreated: new Date(),
    }

    try 
    {
        // Load existing entries
        const existingEntries: tMoodEntry[] = await LoadEntriesAsync();

        // Append new entry to existing entries
        const updatedEntries: tMoodEntry[] = [...existingEntries, newEntry];

        // Save updated entries back to AsyncStorage in JSON format
        await AsyncStorage.setItem(MOOD_KEY, JSON.stringify(updatedEntries));
    }
    catch (error) {
        console.error("Error saving entry to storage: ", error);
    }

}

// Function to get a mood entry by its ID, or null if not found
export async function getEntryByIdAsync(id: string): Promise<tMoodEntry | null> 
{

    // Early return if no ID provided
    if (!id) return null;

    try 
    {
        // Load all entries
        const entries: tMoodEntry[] = await LoadEntriesAsync();

        // Arrow func to find entry by ID using higher-order function find
        const entry: tMoodEntry | undefined = entries.find(e => e.id === id);

        // Return found entry or null if not found
        return entry ?? null;
    }
    catch (error) 
    {
        console.error("Error retrieving entry by ID: ", error);
        return null;
    }
}

// Function to delete all mood entries from AsyncStorage
export async function deleteAllEntriesAsync(): Promise<void> 
{
    try 
    {
        // Remove the mood entries key from AsyncStorage
        await AsyncStorage.removeItem(MOOD_KEY);
    }
    catch (error) 
    {
        console.error("Error deleting all entries: ", error);
    }
}


// Helper function to convert date strings back to Date objects after loading from AsyncStorage (async stores dates as strings, annoying)
async function convertBackToDate(entries: tMoodEntry[]): Promise<tMoodEntry[]> 
{

    // Map through the entries and convert date strings to Date objects
    return entries.map(entry => ({
        ...entry,
        dateCreated: new Date(entry.dateCreated),
        dateModified: entry.dateModified ? new Date(entry.dateModified) : undefined,
    }));
}