import type { Article, BlogCardData } from './types';

export const blogCards: BlogCardData[] = [
    {
        date: '20 March 2023',
        title: 'Enhancing Security with FIDO Keys in 2FA Protocols',
        description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
        link: '#',
    },
    {
        date: '20 March 2023',
        title: 'Emerging Trends in Phishing: A Snapshot of Current Cyber Threats',
        description: 'Stay informed about the latest developments in phishing attacks. This article provides an objective overview of new trends...',
        link: '#',
    },
    {
        date: '20 March 2023',
        title: 'Practical Measures: 5 Tips to Prevent Online Scams',
        description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
        link: '#',
    },
    {
        date: '20 March 2023',
        title: 'Recovering from a Scam: Practical Steps to Take After Falling Victim',
        description: ' If you’ve been scammed, don’t panic— take control. This article guides you through the immediate actions to mitigate damage, report...',
        link: '#',
    },
    {
        date: '20 March 2023',
        title: 'Enhancing Security with FIDO Keys in 2FA Protocols',
        description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
        link: '#',
    },
    {
        date: '20 March 2023',
        title: 'Practical Measures: 5 Tips to Prevent Online Scams',
        description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
        link: '#',
    },
];

export const featuredArticles = [
    { id: 1, label: 'Enhancing Security with FIDO Keys in 2FA Protocols', image: '/images/blog-1.jpg' },
    { id: 2, label: 'Enhancing Security with FIDO Keys in 2FA Protocols', image: '/images/blog-2.jpg' },
    { id: 3, label: 'Enhancing Security with FIDO Keys in 2FA Protocols', image: '/images/blog-3.jpg' },
];

const phishingArticle: Omit<Article, 'id' | 'image'> = {
    title: 'Phishing Scams: Recognizing and Avoiding Them',
    subtitle: 'In the ever-evolving landscape of online threats, phishing scams continue to pose a significant risk to individuals and organizations. Understanding the tactics employed by cybercriminals is crucial for safeguarding your digital presence. Let\'s delve into the world of phishing and explore effective strategies to recognize and avoid falling prey to these scams.',
    sections: [
        {
            title: 'Unmasking Phishing Techniques',
            points: [
                { heading: 'Email Spoofing:', text: ' Phishers often use email spoofing to mimic legitimate sources, creating emails that appear trustworthy. Learn to scrutinize email addresses carefully and look for subtle variations that may indicate a fraudulent attempt.' },
                { heading: 'Deceptive Links:', text: ' Hyperlinks embedded in phishing emails may lead to malicious websites. Hover over links to preview the destination URL before clicking. Legitimate organizations rarely request sensitive information via email.' },
                { heading: 'Impersonation of Trusted Entities:', text: 'Phishers frequently impersonate trusted entities like banks, government agencies, or popular online platforms. Be skeptical of unexpected emails requesting personal or financial information.' },
                { heading: 'Urgent Calls to Action:', text: 'Urgent Calls to Action: Phishing emails often create a sense of urgency, urging recipients to take immediate action. Exercise caution when prompted to provide sensitive information quickly, especially if the request seems unexpected or alarming.' },
            ],
        },
        {
            title: 'Recognizing the Red Flags',
            points: [
                { heading: 'Generic Greetings:', text: ' Phishing emails may use generic greetings like "Dear Customer" instead of addressing you by name. Legitimate organizations usually personalize their communications.' },
                { heading: 'Spelling and Grammar Errors:', text: ' Poor grammar and spelling mistakes are common in phishing emails. Legitimate organizations typically maintain a high standard of communication.' },
                { heading: 'Unexpected Attachments:', text: ' Be wary of unexpected email attachments, as they may contain malware. Only open attachments from trusted sources.' },
            ],
        },
        {
            title: 'Strategies to Avoid Phishing Scams',
            points: [
                { heading: 'Verify Communication:', text: ' If in doubt, independently verify the legitimacy of the communication. Contact the organization directly using trusted contact information, not information provided in the suspicious email.' },
                { heading: 'Enable Two-Factor Authentication (2FA):', text: ' 2FA adds an extra layer of security by requiring additional verification, reducing the risk even if login credentials are compromised.' },
                { heading: 'Stay Informed:', text: ' Regularly educate yourself and your team about evolving phishing techniques. Awareness is a powerful defense against cyber threats.' },
            ],
        },
    ],
    conclusion: 'Phishing scams are pervasive, but with knowledge and vigilance, you can protect yourself from falling victim to these deceptive tactics. Stay alert, scrutinize communications, and implement best practices to fortify your defenses against phishing threats.Remember, your online safety is in your hands. By recognizing the red flags and adopting proactive measures, you can navigate the digital landscape securely and confidently.',
    date: '20 March 2023',
    hashtags: ['#phishing', '#cybersecurity', '#anti-scam'],
};

// Placeholder content until a CMS is connected: every featured article shows the phishing article.
export const articles: Article[] = featuredArticles.map(({ id, image }) => ({ ...phishingArticle, id, image }));

export const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
