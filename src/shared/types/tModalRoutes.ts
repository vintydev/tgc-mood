import { eRootRoute } from "./eRoutes";

// Expandable union type for routes that are presented modally for type safety in navigation
type tModalRoutes = eRootRoute.AddMoodEntry | eRootRoute.MoodEntryDetail;

export default tModalRoutes;