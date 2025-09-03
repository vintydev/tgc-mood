import eMoodType from "../types/eMoodType"


const emojiMapper: Record<eMoodType, string> = {
    [eMoodType.Neutral]: "😐",
    [eMoodType.Happy]: "😊",
    [eMoodType.Sad]: "😢",
    [eMoodType.Angry]: "😠",
    [eMoodType.Anxious]: "😰",
    [eMoodType.Excited]: "🤩",
    [eMoodType.Tired]: "😴",
    
};

export default emojiMapper;