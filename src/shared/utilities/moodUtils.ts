import eMoodType from "../types/mood/eMoodType";

// Utils for mood related operations

// Mapping of Mood IDs to their details
export const MOODS_BY_ID = 
{
    [eMoodType.Neutral]: { id: eMoodType.Neutral, emoji: "😐", label: "Neutral" },
    [eMoodType.Happy]: { id: eMoodType.Happy, emoji: "😊", label: "Happy" },
    [eMoodType.Sad]: { id: eMoodType.Sad, emoji: "😢", label: "Sad" },
    [eMoodType.Angry]: { id: eMoodType.Angry, emoji: "😠", label: "Angry" },
    [eMoodType.Anxious]: { id: eMoodType.Anxious, emoji: "😰", label: "Anxious" },
    [eMoodType.Excited]: { id: eMoodType.Excited, emoji: "🤩", label: "Excited" },
    [eMoodType.Tired]: { id: eMoodType.Tired, emoji: "😴", label: "Tired" },
}

// Type for Mood IDs
export type tMoodId = keyof typeof MOODS_BY_ID;

// Array of all moods
export const ALL_MOODS = Object.values(MOODS_BY_ID);

// Function to get mood by ID
export const getMoodById = (id: eMoodType) => 
{
    return MOODS_BY_ID[id];
}

// Function to get emoji by Mood ID
export const getEmojiByMoodId = (id: eMoodType): string =>
{
    const mood = MOODS_BY_ID[id];
    return mood ? mood.emoji : "";
}

