//checks if uploaded report contains all necessary inventory object keys
export const hasRequiredKeys = (
    requiredKeys: string[],
    compareKeys: string[],
): { isValid: boolean; missingHeaders: string[] } => {
    const missingHeaders: string[] = [];
    const isValid: boolean = requiredKeys.reduce((matches: boolean, header: string) => {
        if (!compareKeys.includes(header)) {
            missingHeaders.push(header);
            matches = false;
        }
        return matches;
    }, true);
    return { isValid, missingHeaders };
};
