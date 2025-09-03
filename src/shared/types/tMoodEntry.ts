import eMoodType from "./eMoodType"
import eTrendDirection from "./eTrendDirection";

type tMoodEntry =
    {
        id: string;
        selectedMood: eMoodType;
        dateCreated: Date;
        dateModified?: Date;
        trendDirection: eTrendDirection;
    };

export default tMoodEntry;

