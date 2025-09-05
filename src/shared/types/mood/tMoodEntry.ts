import eMoodType from "./eMoodType"
import eTrendDirection from "./eTrendDirection";

type tMoodEntry =
    {
        id: string;
        selectedMood: eMoodType;
        emoji?: string;
        dateCreated: Date;
        dateModified?: Date;
    };

export default tMoodEntry;

