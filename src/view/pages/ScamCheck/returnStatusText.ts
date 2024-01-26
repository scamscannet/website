export const returnStatusText = (status?: 'allowlist' | 'blocklist' | 'watchlist' | 'scamscanlist' | 'trusted'| null) => {
    switch (status) {
        case 'allowlist':
        case 'trusted':
            return 'This website is deemed safe for users.It has not exhibited any suspicious or harmful behavior, and interactions with the site are unlikely to pose athreat to your online safety.';
        case 'blocklist':
            return 'Description: This website has been identified as potentially harmful or fraudulent. Exercise caution and avoid interacting with or providing any personal information on this site.';
        case 'watchlist':
        case 'scamscanlist':
            return 'Description: The status of this website has not been definitively categorized as either safe or a scam. It means that there may not be sufficient information available to make a conclusive determination about its safety.';
        default:
            return 'Description: The status of this website has not been definitively categorized as either safe or a scam. It means that there may not be sufficient information available to make a conclusive determination about its safety.';
    }
};
