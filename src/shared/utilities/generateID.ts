
// Simple helper function to generate a unique ID for each storage entry
export function generateUniqueID(): string {

    // Return a random ID based on the current time's milliseconds and a random number
    return "id-" + Date.now().toString(36) + "-" + Math.floor(Math.random()).toString(36).substring(2, 10);
}